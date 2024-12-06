import fs from 'fs'
import { addSetItem } from '../utils/arrayUtils'
import { createDivider, parseWorkspaces, uppercaseFirstChar, globRel } from './helpers/scriptUtils'

/* --- drivers.config.ts ----------------------------------------------------------------------- */

const driverTypeEntriesTemplate = [
'    {{driverType}}: {',
'        {{driverTypeEnumEntries}}',
'    }',
].join('\n')

const driverConfigTemplate = `// -i- Auto generated with "npx turbo run @green-stack/core#collect-drivers"

/* --- Constants ------------------------------------------------------------------------------- */

export const DRIVER_OPTIONS = {
    {{driverTypeEntries}}
} as const

/* --- Types ----------------------------------------------------------------------------------- */

export type DRIVER_CONFIG = {
    {{driverTypes}}
}

export type DRIVER_KEYS = keyof typeof DRIVER_OPTIONS

/* --- Helpers --------------------------------------------------------------------------------- */

export const createDriverConfig = <D extends DRIVER_CONFIG>(config: D) => config
`

/* --- drivers.generated.ts -------------------------------------------------------------------- */

const driverTypeExportTemplate = `{{driverTypeDivider}}

export const {{driverTypeExport}} = {
    {{driverTypeOptionLines}}
}`

const driversFileTemplate = `// -i- Auto generated with "npx turbo run @green-stack/core#collect-drivers"
{{driverImports}}

{{driverTypeExports}}

/* --- All Drivers ----------------------------------------------------------------------------- */

export const drivers = {
    {{driverEntryLines}}
}
`

/* --- Types ----------------------------------------------------------------------------------- */

type DriverConfig = {
    driverImportLines: string[],
    driverEntryLines: string[],
    driverConfigTypeLines: string[],
    drivers: {
        [driverType: string]: {
            driverType: string,
            driverTypeKey: string,
            driverTypeExportKey: string,
            driverTypeEntryLines: string[],
            driverConfigTypeEnumLines: string[],
        }
    }
}

/* --- collect-drivers ------------------------------------------------------------------------- */

const collectDrivers = () => {
    try {
        // Get all driver file paths in /features/ & /packages/ workspaces
        const featureDriverPaths = globRel('../../features/**/drivers/*.*.ts')
        const packageDriverPaths = globRel('../../packages/**/drivers/*.*.ts')
        const allDriverPaths = [...featureDriverPaths, ...packageDriverPaths]

        // Figure out import paths from each workspace
        const { workspaceImports } = parseWorkspaces()

        // Build overview of lines to build driver registry files with
        const driverConfig = allDriverPaths.reduce((acc, driverFilePath) => {

            // Skip if not a valid driver
            const driverFileContents = fs.readFileSync(driverFilePath, 'utf-8')
            const isValidDriver = driverFileContents.includes('export const driver = validateDriver(')
            if (!isValidDriver) return acc

            // Figure out workspace info
            const workspaceEntry = Object.entries(workspaceImports).find(([pathKey]) => {
                return driverFilePath.includes(pathKey)
            })

            // Figure out driver type & name from filename
            const [workspacePath, driverWorkspace] = workspaceEntry!
            const innerDriverFilePath = driverFilePath.split(workspacePath)[1]
            const driverFilename = innerDriverFilePath.replace('/drivers/', '')
            const driverFileModuleName = driverFilename.replace('.tsx', '').replace('.ts', '')
            const [driverName, driverType] = driverFileModuleName.split('.') 
            const driverImportPath = `${driverWorkspace}/drivers/${driverFilename}`
            const driverKey = driverName === 'mock' ? `mock-${driverType}` : driverName
            const driverTypeKey = driverType.length <= 2 ? driverType.toUpperCase() : driverType
            const driverEnumKey = driverName === 'mock' ? `mock${driverTypeKey}` : driverName
            const driverTypeExportKey = `${driverType}Drivers`
            const driverImportAlias = `${driverName}${uppercaseFirstChar(driverType)}Driver`

            // Turn these into lines of code
            const driverImportLine = `import { driver as ${driverImportAlias} } from '${driverImportPath}'`
            const driverTypeEntryLine = `    '${driverKey}': ${driverImportAlias},`
            const driverEntryLine = `    ${driverType}: ${driverTypeExportKey},`
            const driverConfigTypeLine = `    ${driverType}: typeof DRIVER_OPTIONS['${driverType}'][keyof typeof DRIVER_OPTIONS['${driverType}']]`
            const driverConfigTypeEnumLine = `        ${driverEnumKey}: '${driverKey}',`

            // Add to the accumulator
            return {
                driverImportLines: addSetItem(acc.driverImportLines, driverImportLine),
                driverEntryLines: addSetItem(acc.driverEntryLines, driverEntryLine),
                driverConfigTypeLines: addSetItem(acc.driverConfigTypeLines, driverConfigTypeLine),
                drivers: {
                    [driverType]: {
                        driverType,
                        driverTypeKey,
                        driverTypeExportKey,
                        driverTypeEntryLines: addSetItem(
                            acc.drivers?.[driverType]?.driverTypeEntryLines,
                            driverTypeEntryLine,
                        ),
                        driverConfigTypeEnumLines: addSetItem(
                            acc.drivers?.[driverType]?.driverConfigTypeEnumLines,
                            driverConfigTypeEnumLine,
                        )
                    }
                }
            }
        }, {} as DriverConfig)

        // Build drivers.config.ts type entries
        const configTypeSections = Object.values(driverConfig.drivers).map((driverData) => {
            const { driverType, driverConfigTypeEnumLines } = driverData
            const driverTypeEnumEntries = driverConfigTypeEnumLines.join('\n')
            const configSection = driverTypeEntriesTemplate.replace('{{driverType}}', driverType)
            return configSection.replace('        {{driverTypeEnumEntries}}', driverTypeEnumEntries)
        }).join('\n')

        // Build drivers.config.ts file
        const driverTypes = driverConfig.driverConfigTypeLines.join('\n')
        let driverConfigContent = driverConfigTemplate.replace('    {{driverTypeEntries}}', configTypeSections) // prettier-ignore
        driverConfigContent = driverConfigContent.replace('    {{driverTypes}}', driverTypes)
        fs.writeFileSync('../../packages/@registries/drivers.config.ts', driverConfigContent)

        // Build drivers.generated.ts subtype exports
        const driverTypeExports = Object.values(driverConfig.drivers).map((driverData) => {
            const { driverTypeKey, driverTypeExportKey, driverTypeEntryLines } = driverData
            const driverTypeOptionLines = driverTypeEntryLines.join('\n')
            let driverTypeExport = driverTypeExportTemplate.replace('{{driverTypeExport}}', driverTypeExportKey) // prettier-ignore
            driverTypeExport = driverTypeExport.replace('    {{driverTypeOptionLines}}', driverTypeOptionLines) // prettier-ignore
            return driverTypeExport.replace('{{driverTypeDivider}}', createDivider(driverTypeKey))
        }).join('\n')

        // Build drivers.generated.ts file
        const driverEntryLines = driverConfig.driverEntryLines.join('\n')
        const driverImports = driverConfig.driverImportLines.join('\n')
        let driversFileContent = driversFileTemplate.replace('{{driverImports}}', driverImports)
        driversFileContent = driversFileContent.replace('{{driverTypeExports}}', driverTypeExports)
        driversFileContent = driversFileContent.replace('    {{driverEntryLines}}', driverEntryLines) // prettier-ignore
        fs.writeFileSync('../../packages/@registries/drivers.generated.ts', driversFileContent)

    } catch (err) {
        console.log(err)
        console.error(err)
        process.exit(1)
    }
}

/* --- init ------------------------------------------------------------------------------------ */

collectDrivers()
