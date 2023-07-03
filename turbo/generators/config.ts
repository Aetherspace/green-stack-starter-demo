/* eslint-disable import/no-anonymous-default-export */
import fs from 'fs'
import path from 'path'
import { PlopTypes } from '@turbo/gen'
// Generators
import { registerAetherWorkspaceGenerator } from './aether-workspace'
import { registerAetherSchemaGenerator } from './aether-schema'
import { registerAetherResolverGenerator } from './aether-resolver'
import { registerAetherRouteGenerator } from './aether-route'

/* --- Disclaimer ------------------------------------------------------------------------------ */

// Learn more about Turborepo Generators at:
// https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

/* --- Types ----------------------------------------------------------------------------------- */

export type AppendActionConfig = PlopTypes.ActionConfig & {
  path: string
  template: string
  data?: Record<string, unknown>
}

/* --- Register Generators --------------------------------------------------------------------- */

export default function (plop: PlopTypes.NodePlopAPI) {
  plop.setActionType(
    'append-last-line', // @ts-ignore
    function (answers, config: AppendActionConfig, plop: PlopTypes.NodePlopAPI) {
      const targetPath = plop.getPlopfilePath().replace('/turbo/generators', '')
      const absolutePath = path.join(targetPath, config.path)
      // Check if file exists, create it if it doesn't yet
      if (fs.existsSync(absolutePath) === false) fs.writeFileSync(absolutePath, '')
      // Check for last empty line
      const existingContent = fs.readFileSync(absolutePath, 'utf8')
      let newContent = existingContent.replace(/^(.*\S)[\r\n]*$/gm, `$1\n${config.template}`)
      // If no non empty line is found, nothing will have been replaced, so append to the end instead
      if (newContent === existingContent) newContent += config.template
      // Write to file
      fs.writeFileSync(absolutePath, newContent)
      // Tell turborepo where the change was made
      return `/${config.path}`
    }
  )

  // -- Register generators --

  registerAetherWorkspaceGenerator(plop)
  registerAetherSchemaGenerator(plop)
  registerAetherResolverGenerator(plop)
  registerAetherRouteGenerator(plop)
}
