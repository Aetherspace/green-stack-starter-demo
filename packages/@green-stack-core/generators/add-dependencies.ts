/* eslint-disable import/no-anonymous-default-export */
import { PlopTypes } from '@turbo/gen'
import { parseWorkspaces } from '../scripts/helpers/scriptUtils'
import { execSync } from 'child_process'
import fs from 'fs'

/* --- Disclaimer ------------------------------------------------------------------------------ */

// Learn more about Turborepo Generators at:
// https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

/* --- Constants ------------------------------------------------------------------------------- */

const { workspacePackages } = parseWorkspaces('./')

/** --- Dependency Installer ------------------------------------------------------------------- */
/** -i- Install Expo SDK compatible dependencies in your workspace of choice */
export const registerDependencyGenerator = (plop: PlopTypes.NodePlopAPI) => {
    plop.setGenerator('add-dependencies', {
        description: 'Install Expo SDK compatible dependencies in your workspace of choice',
        prompts: [
            {
                type: 'list',
                name: 'workspaceTarget',
                message: 'Which workspace should we install the Expo SDK compatible versions in?',
                choices: workspacePackages,
            },
            {
                type: 'input',
                name: 'dependencies',
                message: "Which dependencies should we install the Expo SDK compatible versions for? (separated by spaces)",
                validate: (value) => !!value,
            },
        ],
        actions: (data) => {
            // Args
            const { workspaceTarget } = data!
            const dependencies = data!.dependencies.split(' ')
            const depList = dependencies.join(' ')

            // Log out the dependencies
            console.log('\n', `> Installing Expo SDK compatible packages ${depList} in '${workspaceTarget}' workspace`) // prettier-ignore

            // Read the @app/expo package json
            const originalExpoPackageJsonFile = fs.readFileSync(`apps/expo/package.json`, 'utf-8')
            const originalExpoPackageJson = JSON.parse(originalExpoPackageJsonFile) // prettier-ignore
            const originalDeps = originalExpoPackageJson.dependencies

            // Install the new dependencies in @app/expo
            const output = execSync(`npm -w @app/expo run add-dependencies ${dependencies.join(' ')}`) // prettier-ignore
            const loggableOutput = output.toString().split('\n').slice(0, 9).join('\n')
            console.log(loggableOutput)

            // Extract the new dependencies from the package json
            const newExpoPackageJson = JSON.parse(fs.readFileSync(`apps/expo/package.json`, 'utf-8')) // prettier-ignore
            const newDeps = Object.entries<string>(newExpoPackageJson.dependencies).filter(([pkg]) => !originalDeps[pkg]) // prettier-ignore

            // Restore the old package json
            fs.writeFileSync(`apps/expo/package.json`, originalExpoPackageJsonFile)

            // Add the new dependencies to the chosen workspace
            const installStatements = newDeps.map(([pkg, v]) => `${pkg}@${v}`).join(' ')
            console.log(`> Moving ${installStatements} to '${workspaceTarget}' workspace`)
            execSync(`npm -w ${workspaceTarget} install ${installStatements} --force`)
            console.log(`> Install successfull`, '\n')

            // Log out the dependency list
            const lsOutput = execSync(`npm ls ${depList}`)
            console.log(lsOutput.toString())

            // Actions
            return []
        },
    })
}
