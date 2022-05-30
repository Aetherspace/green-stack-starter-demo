import React, { ComponentType } from 'react'
import { Canvas, Story } from '@storybook/addon-docs'
import { AetherSchemaType, SchemaPluginMap } from './aetherSchemas'

/* --- Types ----------------------------------------------------------------------------------- */

type AetherComponentType = ComponentType & { propSchema: unknown }

/* --- mapSchemaToPlugin() --------------------------------------------------------------------- */

const mapSchemaToPlugin = (aetherSchema: AetherSchemaType, schemaMap: SchemaPluginMap) => {
  return Object.entries(aetherSchema.schema).reduce((result, [schemaKey, schemaEntry]) => {
    // @ts-ignore
    const mappedSchemaFn = schemaMap[schemaEntry?.aetherType]
    if (typeof mappedSchemaFn !== 'function') return result
    return { ...result, [schemaKey]: mappedSchemaFn?.(schemaKey, schemaEntry) }
  }, {})
}

/* --- getStorybookArgTypes() ---------------------------------------------------------------------- */
// -i- https://storybook.js.org/docs/react/api/argtypes
// -i- https://storybook.js.org/docs/react/essentials/controls

const getStorybookArgTypes = (aetherSchema) => {
  // Error & return early if prop schema is not known
  if (!aetherSchema) {
    console.warn(`Component passed to createStorybookDocs() did not have a propSchema attached to it. Skipping.`)
    return {}
  }
  // Helper
  const createArgType = (dataType, controlType) => (name, schemaConfig) => ({
    name,
    type: {
      name: dataType,
      required: !schemaConfig.optional && !schemaConfig.nullable,
    },
    defaultValue: schemaConfig.default,
    description: schemaConfig.description,
    table: {
      type: { summary: schemaConfig.description || dataType },
      defaultValue: { summary: schemaConfig.default },
    },
    control: {
      type: controlType,
      // ...(dataType === 'enum' ? { options:  })
    },
  })
  // Schema is known, build storybook controls from them
  return mapSchemaToPlugin(aetherSchema, {
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

/* --- getStorybookDocConfig() ---------------------------------------------------------- */

const getStorybookDocConfig = (forComponent, args = {}) => {
  // Extract config
  const [componentName, Component] = Object.entries(forComponent)[0] as [string, AetherComponentType]
  const argTypes = getStorybookArgTypes(Component.propSchema)
  // Return
  return {
    componentName,
    argTypes,
    args,
  }
}

/* --- StorybookDocs() ------------------------------------------------------------------- */

const StorybookDocs = ({ forComponent, args = {} }) => {
  // Extract config
  const [componentName, Component] = Object.entries(forComponent)[0] as [string, AetherComponentType]
  const argTypes = getStorybookArgTypes(Component.propSchema)
  console.log(componentName, argTypes)
}

/* --- Exports --------------------------------------------------------------------------------- */

export { StorybookDocs, getStorybookDocConfig, getStorybookArgTypes }
