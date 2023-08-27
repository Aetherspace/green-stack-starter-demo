import { ComponentType } from 'react'
import { aetherSchemaPlugin } from './aetherSchemaPlugin'
import { AetherSchemaType } from './aetherSchemas'

/* --- Types ----------------------------------------------------------------------------------- */

type AetherComponentType = ComponentType & { propSchema: AetherSchemaType }

type GetDocPropsType =
  | AetherSchemaType
  | ((args: Record<string, any>) => AetherSchemaType)
  | undefined

type StorybookArgType = {
  name
  description?: string
  defaultValue?: unknown
  type: {
    name: string
    required?: boolean
  }
  table: {
    type: { summary?: string }
    defaultValue?: { summary?: string }
  }
  control: {
    type: string
  }
  options?: any[]
}

/* --- Example Input --------------------------------------------------------------------------- */

// export const MyComponent = ({ myProp, anotherProp }) => { ... }
// export const getDocumentationProps = MyComponentPropsAetherSchema.introspect()

// ⇣⇣⇣⇣⇣⇣⇣⇣ results of .introspect() ⇣⇣⇣⇣⇣⇣⇣⇣

// {
//   aetherType: 'AetherSchema',
//   schemaName: 'MyComponentProps',
//   schema: {
//     myProp: {
//       aetherType: 'AetherString',
//       isNullable: false,
//       isOptional: false,
//       description: 'The description from { myProp: z.string().describe(...) }',
//       ...
//     },
//     anotherProp: {
//       aetherType: 'AetherNumber',
//       isNullable: true,
//       isOptional: true,
//       description: 'The description from { anotherProp: z.number().nullable().optional().describe(...) }',
//     },
//     ...
//   }
// }

// -i- https://main--62c9a236ee16e6611d719e94.chromatic.com/?path=/story/aetherspace-single-sources-of-truth--page
// -i- https://main--62c9a236ee16e6611d719e94.chromatic.com/?path=/story/aetherspace-automation--page

/* --- Example Output -------------------------------------------------------------------------- */

// ⇣⇣⇣⇣⇣⇣⇣⇣ results of `aetherStoryDocs(...)` ⇣⇣⇣⇣⇣⇣⇣⇣

// {
//   component: 'MyComponent',
//   argTypes: {
//     myProp: {
//       name: 'myProp',
//       description: 'The description from { myProp: z.string().describe(...) }',
//       defaultValue: undefined,
//       type: { name: 'string', required: true },
//       table: { type: { summary: 'string' } },
//       control: { type: 'text' },
//     },
//     anotherProp: {
//       name: 'anotherProp',
//       description: 'The description from { anotherProp: z.number().nullable().optional().describe(...) }',
//       defaultValue: undefined,
//       type: { name: 'number', required: false },
//       table: { type: { summary: 'number' } },
//       control: { type: 'number' },
//     },
//     ...
//   }
// }

// -i- https://storybook.js.org/docs/react/api/arg-types#manually-specifying-argtypes

// ⇣⇣⇣⇣⇣⇣⇣⇣ results of `yarn document-components` ⇣⇣⇣⇣⇣⇣⇣⇣

// => New or updated storybook file at `/packages/@registries/docs/{src-workspace}/components.stories.mdx`

/** --- aetherSchemaArgTypes() ----------------------------------------------------------------- */
/** -i- Turn an aetherSchema defined with zod into a storybook argTypes object
 ** https://storybook.js.org/docs/react/api/argtypes
 ** https://storybook.js.org/docs/react/essentials/controls */
const aetherSchemaArgTypes = (aetherSchema) => {
  // Error & return early if prop schema is not known
  if (!aetherSchema) {
    console.warn(`Component passed to createStorybookDocs() did not have a propSchema attached to it. Skipping.`) // prettier-ignore
    return {}
  }
  // Storybook ArgTypes factory
  const createArgType = (dataType, controlType) => (schemaKey, schemaConfig) => {
    const { isNullable, isOptional } = schemaConfig
    const isNullish = [isNullable, isOptional].includes(true)
    const argType: StorybookArgType = {
      name: schemaKey,
      description: schemaConfig.description,
      type: {
        name: dataType,
        required: !isNullish,
      },
      table: {
        type: {
          summary: [
            schemaConfig.schemaName || dataType,
            isNullable && 'null',
          ].filter(Boolean).join(' | '), // prettier-ignore
        },
      },
      control: { type: controlType },
    }
    // Provide options from schema?
    if (dataType === 'enum') {
      argType.options = Object.values(schemaConfig.schema).filter((opt) => {
        return !['displayName', '__docgenInfo'].includes(opt as string)
      })
      if (isNullish) argType.options = [undefined, ...argType.options]
    }
    // Fill in default value?
    if (schemaConfig?.defaultValue) {
      argType.table.defaultValue = { summary: schemaConfig.defaultValue }
    } else if (dataType === 'enum' && isNullish) {
      argType.table.defaultValue = { summary: undefined }
    }
    // Return final result
    return argType
  }
  // Schema is known, build storybook controls from them
  return aetherSchemaPlugin<StorybookArgType>(aetherSchema, {
    // -- Primitives --
    AetherString: createArgType('string', 'text'),
    AetherNumber: createArgType('number', 'number'),
    AetherBoolean: createArgType('boolean', 'boolean'),
    AetherDate: createArgType('date', 'date'),
    // -- Single values --
    AetherId: createArgType('string', 'text'),
    AetherColor: createArgType('color', 'color'),
    AetherEnum: createArgType('enum', 'select'),
    // -- Objectlikes --
    AetherSchema: createArgType('object', 'object'),
    AetherObject: createArgType('object', 'object'),
    // -- Arraylikes --
    AetherArray: createArgType('array', 'object'),
    // -- Complex types --
    AetherUnion: createArgType('string', 'text'),
    AetherTuple: createArgType('array', 'object'),
  })
}

/* --- aetherStoryDocs() ----------------------------------------------------------------------- */

const aetherStoryDocs = (forComponent, getDocumentationProps: GetDocPropsType, args = {}) => {
  // Extract config
  const [componentName, Component] = Object.entries(forComponent)[0] as [string, AetherComponentType] // prettier-ignore
  // Figure out propSchema source
  let propSchema = (Component?.propSchema || getDocumentationProps || {}) as AetherSchemaType
  if (typeof getDocumentationProps === 'function') propSchema = getDocumentationProps(args)
  const argTypes = aetherSchemaArgTypes(propSchema)
  // Figure out story args
  const storyArgs = Object.entries(argTypes).reduce((acc, [propKey, argType]) => {
    const defaultValue = argType.table.defaultValue?.summary
    const exampleValue = propSchema?.schema?.[propKey]?.exampleValue
    const storyValue = args[propKey] ?? exampleValue ?? defaultValue ?? argType.options?.[0]
    return typeof storyValue !== 'undefined' ? { ...acc, [propKey]: storyValue } : acc
  }, {})
  // Return
  return {
    componentName,
    argTypes,
    args: storyArgs,
  }
}

/* --- Exports --------------------------------------------------------------------------------- */

export { aetherStoryDocs, aetherSchemaArgTypes }
export default aetherStoryDocs
