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

/* --- aetherSchemaArgTypes() ------------------------------------------------------------------ */
// -i- https://storybook.js.org/docs/react/api/argtypes
// -i- https://storybook.js.org/docs/react/essentials/controls

const aetherSchemaArgTypes = (aetherSchema) => {
  // Error & return early if prop schema is not known
  if (!aetherSchema) {
    console.warn(`Component passed to createStorybookDocs() did not have a propSchema attached to it. Skipping.`) // prettier-ignore
    return {}
  }
  // Storybook ArgTypes factory
  const createArgType = (dataType, controlType) => (name, schemaConfig) => {
    const { isNullable, isOptional } = schemaConfig
    const isNullish = [isNullable, isOptional].includes(true)
    const argType: StorybookArgType = {
      name,
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
            // isOptional && '(undefined)',
          ].filter(Boolean).join(' | '), // prettier-ignore
        },
      },
      control: { type: controlType },
    }
    // Fill in extra table values
    if (dataType === 'enum') argType.options = Object.values(schemaConfig.schema)
    if (schemaConfig?.defaultValue) argType.table.defaultValue = { summary: schemaConfig.defaultValue } // prettier-ignore
    // Return final result
    return argType
  }
  // Schema is known, build storybook controls from them
  return aetherSchemaPlugin<StorybookArgType>(aetherSchema, {
    // -- Primitives --
    AetherString: createArgType('string', 'text'),
    AetherNumber: createArgType('number', 'number'),
    AetherBoolean: createArgType('boolean', 'boolean'),
    // -- Single values --
    AetherId: createArgType('string', 'text'),
    AetherColor: createArgType('color', 'color'),
    AetherDate: createArgType('date', 'date'),
    AetherEnum: createArgType('enum', 'select'),
    // -- Objectlikes --
    AetherSchema: createArgType('object', 'object'),
    AetherObject: createArgType('object', 'object'),
    // -- Arraylikes --
    AetherArray: createArgType('array', 'object'),
    AetherCollection: createArgType('array', 'object'),
  })
}

/* --- aetherStoryDocs() ----------------------------------------------------------------------- */

const aetherStoryDocs = (forComponent, getDocumentationProps: GetDocPropsType, args = {}) => {
  // Extract config
  const [componentName, Component] = Object.entries(forComponent)[0] as [string, AetherComponentType] // prettier-ignore
  // Figure out propSchema source
  let propSchema = Component?.propSchema || getDocumentationProps || {}
  if (typeof getDocumentationProps === 'function') propSchema = getDocumentationProps(args)
  const argTypes = aetherSchemaArgTypes(propSchema)
  // Figure out story args
  const storyArgs = Object.entries(argTypes).reduce((acc, [propKey, argType]) => {
    const defaultValue = argType.table.defaultValue?.summary
    const exampleValue = propSchema?.schema?.[propKey]?.example
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
