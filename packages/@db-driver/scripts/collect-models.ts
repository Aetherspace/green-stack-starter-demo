import fs from 'fs'
import { addSetItem } from '@green-stack/utils/arrayUtils'
import { parseWorkspaces, replaceMany, globRel } from '@green-stack/scripts/helpers/scriptUtils'

/* --- models.generated.ts --------------------------------------------------------------------- */

const modelsFileTemplate = `// -i- Auto generated with "npx turbo run @db/driver#collect-models"
{{modelImportLines}}

/* --- Reexports ------------------------------------------------------------------------------- */

export {
    {{modelModuleAliasLines}}
}

/* --- Models ---------------------------------------------------------------------------------- */

const dbModels = {
    {{modelModuleAliasLines}}
}

/* --- Exports --------------------------------------------------------------------------------- */

export type DB_MODEL = keyof typeof dbModels

export default dbModels
`

/* --- Types ----------------------------------------------------------------------------------- */

type ModelRegistry = {
    modelImportLines: string[],
    modelAliasEntryLines: string[],
}

/* --- collect-models -------------------------------------------------------------------------- */

const collectModels = () => {
    try {
        // Get all model file paths in /features/ & /packages/ workspaces
        const featureModelPaths = globRel('../../features/**/models/*.model.ts')
        const packageModelPaths = globRel('../../packages/**/models/*.model.ts')
        const allModelPaths = [...featureModelPaths, ...packageModelPaths]

        // Figure out import paths from each workspace
        const { workspaceImports } = parseWorkspaces()

        // Build overview of lines to build model registry files with
        const modelRegistry = allModelPaths.reduce((acc, modelFilePath) => {
            
            // Skip if not a valid model
            const modelFileContents = fs.readFileSync(modelFilePath, 'utf-8')
            const isValidModel = modelFileContents.includes('export const driverModel = validateDriverModel(')
            if (!isValidModel) return acc

            // Figure out model workspace from filename
            const workspaceEntry = Object.entries(workspaceImports).find(([pathKey]) => {
                return modelFilePath.includes(pathKey)   
            })

            // Figure out model name from filename
            const [workspacePath, modelWorkspace] = workspaceEntry!
            const innerModelFilePath = modelFilePath.split(workspacePath)[1]
            const modelFilename = innerModelFilePath.replace('/models/', '')
            const modelFileModuleName = modelFilename.replace('.tsx', '').replace('.ts', '')
            const [modelName] = modelFileModuleName.split('.')
            const modelImportPath = `${modelWorkspace}/models/${modelFilename}`
            const modelImportLine = `import { driverModel as ${modelName} } from '${modelImportPath}'` // prettier-ignore
            const modelModuleAliasLine = `    ${modelName}`
            
            // Add to the accumulator
            return {
                modelImportLines: addSetItem(acc.modelImportLines, modelImportLine),
                modelAliasEntryLines: addSetItem(acc.modelAliasEntryLines, modelModuleAliasLine),
            }

        }, {} as ModelRegistry)

        // Build models.generated.ts file
        const modelModuleAliasLines = modelRegistry.modelAliasEntryLines.join('\n,')
        const modelImportLines = modelRegistry.modelImportLines.join('\n')
        let modelsFileContent = modelsFileTemplate.replace('{{modelImportLines}}', modelImportLines) // prettier-ignore
        modelsFileContent = replaceMany(modelsFileContent, ['    {{modelModuleAliasLines}}'], modelModuleAliasLines) // prettier-ignore
        fs.writeFileSync('../../packages/@registries/models.generated.ts', modelsFileContent)

    } catch (err) {
        console.log(err)
        console.error(err)
        process.exit(1)
    }
}

/* --- init ------------------------------------------------------------------------------------ */

collectModels()
