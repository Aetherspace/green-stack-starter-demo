import glob from 'glob' // @ts-ignore
import { mock } from 'bun:test'

/* --- Mock tsConfig paths --------------------------------------------------------------------- */

// -i- We need to mock the tsConfig paths for esbuild-register to work
// -i- ... as it doesn't have the same path resolution as typescript.

const featureTsConfigs = glob.sync('./features/**/tsconfig.json')
const packageTsConfigs = glob.sync('./packages/**/tsconfig.json')
const relevantTsConfigs = [...featureTsConfigs, ...packageTsConfigs]
relevantTsConfigs.forEach(async (tsConfigPath) => {
    const actualTsConfigPath = tsConfigPath.replace('./', '../../')
    const tsConfig = await import(actualTsConfigPath)
    const tsConfigPathAliases = tsConfig.compilerOptions?.paths || {} // @ts-ignore
    Object.entries(tsConfigPathAliases).forEach(([aliasKey, [aliasedPath]]) => {
        // Aliases to single files
        if (!aliasKey.includes('*')) mock.module(aliasKey, () => import(aliasedPath))
        // Wildcard * aliases to multiple files
        if (aliasKey.includes('*')) {
            const [importPathBase] = aliasedPath.split('*')
            const aliasGlob = aliasedPath.replace('*', '**/*.{ts,tsx}').replace('../../', './')
            const aliasedPaths = glob.sync(aliasGlob)
            aliasedPaths.forEach((file) => {
                const actualFilePath = file.replace('./', '../../').replace('.tsx', '').replace('.ts', '') // prettier-ignore
                const modulePathFromAlias = actualFilePath.split(importPathBase)[1]?.replace('.tsx', '').replace('.ts', '') // prettier-ignore
                const normalizedAliasKey = aliasKey.replace('/*', '/').replace('./', '../../')
                const aliasFilePath = `${normalizedAliasKey}${modulePathFromAlias}`
                mock.module(aliasFilePath, () => import(actualFilePath))
            })
        }
    })
})

/* --- Mock Flow typed modules ----------------------------------------------------------------- */

// -i- We need aliases for these as they touch parts of react-native that ship Flow types
// -i- ... which typescript can't deal with.

mock.module('expo-constants', () => import('./__mocks__/expo-constants.mock'))
mock.module(require.resolve('expo-constants'), () => import('./__mocks__/expo-constants.mock')) // @ts-ignore
mock.module('react-native', () => import('react-native-web')) // @ts-ignore
mock.module(require.resolve('react-native'), () => import('react-native-web'))
