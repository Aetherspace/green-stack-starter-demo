/* eslint-disable import/no-anonymous-default-export */
import { PlopTypes } from '@turbo/gen'
import { validateNonEmptyNoSpaces, getWorkspaceOptions, createDivider } from '../scripts/helpers/scriptUtils'

/* --- Disclaimer ------------------------------------------------------------------------------ */

// Learn more about Turborepo Generators at:
// https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

/* --- Constants ------------------------------------------------------------------------------- */

const workspaceOptions = getWorkspaceOptions('./')

/* --- Helpers --------------------------------------------------------------------------------- */

export const createSchemaContent = (ctx: {
    schemaName: string,
    schemaFields: string[],
    descriptions: string[],
    jsDocTitle: string,
    jsDocDescription?: string,
    describeStatement?: string,
}) => [

    `import { z, schema } from '@green-stack/schemas'\n`,

    `${createDivider('Descriptions')}\n`,

    `const d = {`,
        ctx.descriptions.map((d) => `    ${d}`).join('\n'),
    `}\n`,

    [ctx.jsDocTitle, ctx.jsDocDescription].filter(Boolean).join('\n'),
    `export const ${ctx.schemaName} = schema('${ctx.schemaName}', {`,
        ctx.schemaFields.map((l) => `    ${l}`).join('\n'),
    `})${ctx.describeStatement}\n`,

    `${createDivider('Type Alias')}\n`,

    `export type ${ctx.schemaName} = z.infer<typeof ${ctx.schemaName}>\n`,

].join('\n')

/** --- Schema Generator ----------------------------------------------------------------------- */
/** -i- Simple generator to add a new zod schema as a single source of truth */
export const registerSchemaGenerator = (plop: PlopTypes.NodePlopAPI) => {
    plop.setGenerator('add-schema', {
        description: 'Simple generator to add a new zod schema as a single source of truth',
        prompts: [
            {
                type: 'list',
                name: 'workspaceTarget',
                message: 'Where would you like to add this schema?',
                choices: Object.keys(workspaceOptions),
            },
            {
                type: 'input',
                name: 'schemaName',
                message: 'What is the schema name?',
                validate: validateNonEmptyNoSpaces,
            },
            {
                type: 'input',
                name: 'schemaDescription',
                message: 'Optional description: What data structure does this schema describe?',
            },
            {
                type: 'checkbox',
                name: 'commonFields',
                message: 'Optional examples: Would you like to add any common field definitions?', // prettier-ignore
                choices: ['id', 'slug'],
            },
        ],
        actions: (data) => {
            // Args
            const { workspaceTarget, schemaName, schemaDescription, commonFields } = data!

            // -- Vars --

            const workspacePath = workspaceOptions[workspaceTarget]
            const descriptions = [] as string[]
            const schemaFields = [] as string[]

            let jsDocDescription = ''
            let jsDocTitle = ''
            let describeStatement = ''

            // -- Optionals --

            if (schemaDescription) {
                descriptions.push(`${schemaName}: \`${schemaDescription}\`,`)
                jsDocDescription = `/** -i- ${schemaDescription} */`
                jsDocTitle = createDivider(schemaName, true)
                describeStatement = `.describe(d.${schemaName})`
            } else {
                jsDocTitle = createDivider(schemaName, false)
            }
        
            if (commonFields.includes('id')) {
                descriptions.push(`id: \`the unique identifier for this ${schemaName}\`,`)
                schemaFields.push(`id: z.string().uuid().describe(d.id),`)
            }
        
            if (commonFields.includes('slug')) {
                descriptions.push(`slug: \`the unique slug for this ${schemaName}\`,`)
                schemaFields.push(`slug: z.string().describe(d.slug),`)
            }

            // -- Build schema --

            const schemaContent = createSchemaContent({
                schemaName,
                schemaFields,
                descriptions,
                jsDocTitle,
                jsDocDescription,
                describeStatement,
            })

            // -- Actions --

            const actions = [
                {
                    type: 'add',
                    path: `${workspacePath}/schemas/${schemaName}.ts`,
                    template: schemaContent,
                },
                {
                    type: 'open-files-in-vscode',
                    paths: [`${workspacePath}/schemas/${schemaName}.ts`],
                },
            ] as PlopTypes.ActionType[]

            // -- Generate --

            return actions
        },
    })
}
