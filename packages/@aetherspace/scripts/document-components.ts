import glob from 'glob'
import fs from 'fs'
// Utils
import { excludeDirs, parseWorkspaces } from './helpers/scriptUtils'
import { replaceStringVars } from '../utils/stringUtils'
import { isEmpty } from '../utils/commonUtils'

/* --- templates ------------------------------------------------------------------------------- */

const mdxTemplate = `import { Meta, Canvas, Story, ArgsTable } from '@storybook/addon-docs'
import { aetherStoryDocs } from 'aetherspace/schemas/utils'
import { isEmpty } from 'aetherspace/utils/commonUtils'
// -i- Auto generated with "yarn document-components"
// Components hooking into the storybook auto-documentation script
{{imports}}

<Meta title="{{storyTitle}}" />

export const createDocs = (Component) => (args) => {
  return (
    <StoryContextProviders>
      <Component {...args} />
    </StoryContextProviders>
  )
}
{{stories}}

---

> ⚙️ Automatically generated by the \`yarn document-components\` script.

`

const storyTemplate = `
## {componentName}

export const {componentNameDocs} = createDocs({componentName})
export const {componentNameConfig} = aetherStoryDocs({ {componentName} }, {getDocumentationProps})

{filePath}
{importExample}

<Canvas{customBg}>
    <Story
        name="{componentName}"
        args={{componentNameConfig}.args}
        argTypes={{componentNameConfig}.argTypes}
        parameters={{componentDocParams}}
    >
      {{componentNameDocs}.bind({})}
    </Story>
</Canvas>

{!isEmpty({componentNameConfig}.args) && <ArgsTable story="{componentName}" />}

{{stories}}
`

const baseStoryParams = `{
          backgrounds: {
            default: 'light',
            values: [
              { name: 'light', value: '#FFFFFF' },
              { name: 'dark', value: '#333333' },
            ],
          },
        }`

/* --- document-components --------------------------------------------------------------------- */

const documentComponents = () => {
  try {
    // Figure out import paths from each workspace
    const { workspaceImports } = parseWorkspaces()

    // Get all component file paths
    const appComponentPaths = glob.sync('../../apps/**/*.tsx')
    const featureComponentPaths = glob.sync('../../features/**/*.tsx')
    const packageComponentPaths = glob.sync('../../packages/**/*.tsx')
    const allComponentPaths = [...appComponentPaths, ...featureComponentPaths, ...packageComponentPaths].filter(excludeDirs) // prettier-ignore
    // Filter out any components that don't hook into 'getDocumentationProps'
    const documentedFolders = allComponentPaths.reduce((acc, componentPath) => {
      // Read the component file contents
      const pathContents = fs.readFileSync(componentPath, 'utf8')
      // Skip files that don't export getDocumentationProps
      if (!pathContents.includes('getDocumentationProps')) return acc
      if (pathContents.includes('// export const getDocumentationProps')) return acc
      // Check if the component has documentation parameters
      const hasDocParams = pathContents.includes('export const getDocumentationParams')
      // Add component folder to the documented folders list
      const [componentFile, ...componentFolderTree] = componentPath.split('/').reverse()
      const componentFolder = componentFolderTree.reverse().join('/')
      const componentName = componentFile.split('.')[0]
      // If the component file name does not match an exported component, skip it
      const hasNamedExport = pathContents.includes(`export const ${componentName} `)
      const hasDefaultExport = pathContents.includes(`export default ${componentName}`)
      const hasExtendedDefault = pathContents.includes(`export default Object.assign(${componentName}`) // prettier-ignore
      if (!hasNamedExport && !hasDefaultExport && !hasExtendedDefault) return acc
      // Add component config to the documented folders list
      return {
        ...acc,
        [componentFolder]: {
          ...acc[componentFolder],
          [componentPath]: {
            componentName,
            componentFile,
            componentFolder,
            hasNamedExport,
            hasDocParams,
          },
        },
      }
    }, {})
    // Log out doc creation process
    if (!isEmpty(documentedFolders)) {
      console.log('-----------------------------------------------------------------')
      console.log("-i- Auto documenting with 'yarn document-components' ...") // prettier-ignore
      console.log('-----------------------------------------------------------------')
    }
    // Make .stories.mdx files for each folder with components in it
    Object.keys(documentedFolders).forEach((componentFolder) => {
      const componentsList = Object.values(documentedFolders[componentFolder]) as Record<string, string>[] // prettier-ignore
      // Figure out folder nesting
      const rootFolders = componentFolder.split('/').filter((folderLevel) => folderLevel !== '..')
      const folderLevels = rootFolders.length + 2 // +2 for the 'packages' and '@registries' folders
      const relativeSections = new Array(folderLevels).fill('../').join('')
      // Create the .stories.mdx file content
      const storiesFile = componentsList.reduce((acc, componentConfig) => {
        const { componentName, componentFile, componentFolder, hasNamedExport, hasDocParams } = componentConfig // prettier-ignore
        const storyImportPath = `${componentFolder.replace('../../', relativeSections)}/${componentFile}` // prettier-ignore
        // Build story import statement
        const storyPropsAlias = `get${componentName}Props`
        const storyComponentAlias = hasNamedExport ? componentName : `default as ${componentName}`
        const storyComponentParams = hasDocParams ? `, getDocumentationParams as get${componentName}Params` : '' // prettier-ignore
        const storyImportLine = `import { ${storyComponentAlias}, getDocumentationProps as ${storyPropsAlias}${storyComponentParams} } from '${storyImportPath}'` // prettier-ignore
        // Build component import example
        const importStatement = hasNamedExport ? `{ ${componentName} }` : componentName
        const componentFilePath = `${componentFolder.replace('../../', '')}/${componentName}`
        const shieldFilePath = componentFilePath.replace('-', '--')
        const [workspaceType, workspaceFolderName, componentFolderName, componentFileName] = componentFilePath.split('/') // prettier-ignore
        const workspaceFolder = [workspaceType, workspaceFolderName].join('/') // e.g. 'packages/@aetherspace'
        const workspaceImport = workspaceImports[workspaceFolder] // e.g. 'aetherspace'
        const importPath = `${workspaceImport}/${componentFolderName}/${componentName}`
        const importPathAlt = `${workspaceImport}/${componentFolderName}${componentFilePath.split(componentFolderName)[1]}`.replace('.tsx', '') // prettier-ignore
        const importPathFinal = componentFileName === componentName ? importPath : importPathAlt
        const importExample = `import ${importStatement} from '${importPathFinal}'`
        // Add import statement to the imports list
        let updatedStoryFile = acc.replace('{{imports}}\n', `${storyImportLine}\n{{imports}}\n`)
        // Build story
        const story = replaceStringVars(storyTemplate, {
          componentName,
          componentNameDocs: `${componentName}Docs`,
          componentNameConfig: `${componentName}Config`,
          getDocumentationProps: storyPropsAlias,
          componentDocParams: hasDocParams ? `get${componentName}Params` : baseStoryParams,
          customBg: hasDocParams ? ` style={{ backgroundColor: get${componentName}Params.backgrounds?.values?.[0]?.value }}` : '', // prettier-ignore
          // filePath: `\`/${componentFilePath}.tsx\` ![File Path](https://img.shields.io/badge/${componentName}-%23F8F8F8?style=flat-square&logo=visualstudiocode&logoColor=blue&&label=file%3A&labelColor=%23DDDDDD)`,
          filePath: `\`/${componentFilePath}.tsx\``,
          importExample: '```typescript\n' + importExample + '\n```\n',
        })
        // Add story to the stories list
        updatedStoryFile = updatedStoryFile.replace('{{stories}}', `${story}`)
        // Return updated story file
        return updatedStoryFile
      }, mdxTemplate)
      // Create the context providers import path
      const storyContextProvidersPath = `${relativeSections}features/app-core/mocks/StoryContextProviders`
      const storyContextProvidersImport = `// Mocks\nimport StoryContextProviders from '${storyContextProvidersPath}'\n` // prettier-ignore
      const storiesFileWithContext = storiesFile.replace('{{imports}}\n', storyContextProvidersImport) // prettier-ignore
      // Update story title
      const storyTitle = rootFolders.join(' / ')
      const finalStoryFile = storiesFileWithContext.replace('{{stories}}\n', '').replace('{{storyTitle}}', storyTitle) // prettier-ignore
      // Write the .stories.mdx file
      const componentFolderName = rootFolders.pop() // remove the last folder name
      const storyFolder = rootFolders.join('/')
      const rootFolderPath = `../../packages/@registries/docs/${storyFolder}`
      const storyFilePath = `${rootFolderPath}/${componentFolderName}.stories.mdx`
      fs.mkdirSync(rootFolderPath, { recursive: true })
      fs.writeFileSync(storyFilePath, finalStoryFile)
      console.log(` ✅ ${storyFilePath.replace('../../', '')}`)
    })
  } catch (err) {
    console.log(err)
    console.error(err)
    process.exit(1)
  }
}

/* --- init ------------------------------------------------------------------------------------ */

documentComponents()
