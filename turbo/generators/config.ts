/* eslint-disable import/no-anonymous-default-export */
import fs from 'fs'
import path from 'path'
import { PlopTypes } from '@turbo/gen'
import { execSync } from 'child_process'
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
  // -- Register actions --

  plop.setActionType(
    'append-last-line', // @ts-ignore
    function (answers, config: AppendActionConfig, plop: PlopTypes.NodePlopAPI) {
      const targetPath = plop.getPlopfilePath().replace('/turbo/generators', '')
      const absolutePath = path.join(targetPath, config.path)
      // Check if file exists, create it if it doesn't yet
      if (fs.existsSync(absolutePath) === false) fs.writeFileSync(absolutePath, '')
      // Append as last non-empty line
      const existingContent = fs.readFileSync(absolutePath, 'utf8')
      const existingLines = existingContent.split('\n').filter(Boolean)
      const newContent = [...existingLines, config.template, ''].join('\n')
      // Write to file
      fs.writeFileSync(absolutePath, newContent)
      // Tell turborepo where the change was made
      return `/${config.path}`
    }
  )

  plop.setActionType(
    'open-files-in-vscode', // @ts-ignore
    function (_answers, config: { paths: string[] }, plop: PlopTypes.NodePlopAPI) {
      const targetPath = plop.getPlopfilePath().replace('/turbo/generators', '')
      const absolutePaths = config.paths.map((p) => path.join(targetPath, p))
      // Open files in VSCode
      execSync(`code ${absolutePaths.join(' ')}`)
    }
  )

  // -- Register generators --

  registerAetherWorkspaceGenerator(plop)
  registerAetherSchemaGenerator(plop)
  registerAetherResolverGenerator(plop)
  registerAetherRouteGenerator(plop)
}
