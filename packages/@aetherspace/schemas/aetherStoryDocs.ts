import { ComponentType } from 'react'
import { aetherSchemaPlugin } from './aetherSchemaPlugin'
import { AetherSchemaType } from './aetherSchemas'

/* --- Types ----------------------------------------------------------------------------------- */

type AetherComponentType = ComponentType & { propSchema: AetherSchemaType }

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
    console.warn(`Component passed to createStorybookDocs() did not have a propSchema attached to it. Skipping.`)
    return {}
  }
  // Storybook ArgTypes factory
  const createArgType = (dataType, controlType) => (name, schemaConfig) => {
    const argType: StorybookArgType = {
      name,
      description: schemaConfig.description,
      type: {
        name: dataType,
        required: !schemaConfig.optional && !schemaConfig.nullable,
      },
      table: {
        type: { summary: dataType },
      },
      control: { type: controlType },
    }
    // Fill in extra table values
    if (dataType === 'enum') argType.options = Object.values(schemaConfig.schema)
    if (typeof schemaConfig?.default !== 'function') argType.table.defaultValue = { summary: schemaConfig.default }
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
    AetherEnum: createArgType('enum', 'select'), // TODO: expand with options
    // -- Objectlikes --
    AetherSchema: createArgType('object', 'object'), // TODO: add schema name to description
    AetherObject: createArgType('object', 'object'),
    // -- Arraylikes --
    AetherArray: createArgType('array', 'object'),
    AetherCollection: createArgType('array', 'object'),
  })
}

/* --- aetherStoryDocs() ----------------------------------------------------------------------- */

const aetherStoryDocs = (forComponent, args = {}) => {
  // Extract config
  const [componentName, Component] = Object.entries(forComponent)[0] as [string, AetherComponentType]
  const argTypes = aetherSchemaArgTypes(Component.propSchema)
  // Figure out story args
  const storyArgs = Object.entries(argTypes).reduce((acc, [propKey, argType]) => {
    const defaultValue = argType.table.defaultValue?.summary
    const exampleValue = Component.propSchema?.schema?.[propKey]?.example
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
