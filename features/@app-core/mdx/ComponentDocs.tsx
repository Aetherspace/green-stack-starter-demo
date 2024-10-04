import { useState, createContext, useContext, useMemo, useEffect } from 'react'
import { useTheme } from 'nextra-theme-docs'
import { z, Meta$Schema } from '@green-stack/schemas'
import { View, cn } from '@app/components/styled'
import { useFormState } from '@green-stack/forms/useFormState'

/* --- Types ----------------------------------------------------------------------------------- */

export type ComponentDocsProps = {
    component: React.ComponentType<any>,
    docsConfig: {
        componentName: string,
        propSchema: z.ZodObject<z.ZodRawShape>,
        propMeta: Record<string, Meta$Schema>,
        previewProps: Record<string, any$Unknown>,
    }
}

export type ComponentDocsContext = {
    components: {
        [key: string]: ComponentDocsProps
    },
    setComponentDocs: (key: string, value: ComponentDocsProps) => void,
}

/* --- Context --------------------------------------------------------------------------------- */

export const ComponentDocsContext = createContext<ComponentDocsContext>({
    components: {},
    setComponentDocs: () => {},
})

export const useComponentDocsContext = () => useContext(ComponentDocsContext)

/* --- useComponentDocs() ---------------------------------------------------------------------- */

export const useComponentDocs = (props: ComponentDocsProps, syncInitialState = false) => {
    // Props
    const componentName = props.docsConfig.componentName! || props.component.displayName!

    // Context
    const { components, setComponentDocs } = useComponentDocsContext()
    const { component, docsConfig } = components[componentName] || props
    const { propSchema, propMeta, previewProps } = docsConfig

    // -- Handlers --

    const setPreviewProps = (newProps: Record<string, any$Unknown>) => {
        setComponentDocs(componentName, {
            component,
            docsConfig: {
                ...docsConfig,
                previewProps: {
                    ...docsConfig.previewProps,
                    ...newProps,
                },
            },
        })
    }

    // -- Effects --

    useEffect(() => {
        if (!syncInitialState) return
        const isRegistered = !!components[componentName]
        if (!isRegistered) setComponentDocs(componentName, { component, docsConfig })
    }, [])

    // -- Resources --

    return {
        component,
        docsConfig,
        componentName,
        propSchema,
        propMeta,
        previewProps,
        setPreviewProps,
    }
}

/* --- <ComponentDocsContextManager/> ---------------------------------------------------------- */

export const ComponentDocsContextManager = ({ children }: { children: React.ReactElement }) => {

    // State
    const [components, setComponents] = useState<ComponentDocsContext['components']>({})

    // -- Handlers --

    const setComponentDocs = (key: string, value: ComponentDocsProps) => {
        setComponents((prev) => ({ ...prev, [key]: value }))
    }

    // -- Render --

    return (
        <ComponentDocsContext.Provider value={{ components, setComponentDocs }}>
            {children}
        </ComponentDocsContext.Provider>
    )
}

/* --- <ComponentDocsPreview/> ----------------------------------------------------------------- */

export const ComponentDocsPreview = (props: ComponentDocsProps) => {
    // Props
    const { component: Component } = props

    // Context
    const docs = useComponentDocs(props)
    const { previewProps } = docs

    // -- Theme --

    const theme = useTheme()
    const resolvedTheme = (theme.resolvedTheme || theme.systemTheme) as 'light' | 'dark'

    const [colorScheme, setColorScheme] = useState<'light' | 'dark' | undefined>(resolvedTheme)
    const [didMount, setDidMount] = useState(false)

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        let currentTheme = (resolvedTheme || storedTheme) as 'light' | 'dark' | 'system'
        if (currentTheme === 'system' || !currentTheme) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            const prefersDark = mediaQuery.media === '(prefers-color-scheme: dark)' && mediaQuery.matches
            currentTheme = prefersDark ? 'dark' : 'light'
        }
        if (colorScheme !== currentTheme) setColorScheme(currentTheme)
        setDidMount(true)
    }, [resolvedTheme])


    const viewClassNames = cn(
        "relative min-w-400 min-h-200 p-12 rounded-xl",
        didMount && colorScheme === 'light' && 'bg-slate-200',
        didMount && colorScheme === 'dark' && 'bg-zinc-900',
    )

    // -- Server Rendering --

    if (!didMount) return (
        <View
            className={cn(
                viewClassNames,
                'min-h-200 bg-slate-500 opacity-20 animate-pulse',
            )}
        />
    )

    // -- Client Rendering --

    return (
        <View key={viewClassNames} className={viewClassNames}>
            <Component {...previewProps} />
        </View>
    )
}

/* --- <ComponentDocsPropTable/> --------------------------------------------------------------- */

export const ComponentDocsPropTable = (props: ComponentDocsProps) => {
    // Context
    const docsUtils = useComponentDocs(props, true)
    const { previewProps, propSchema, propMeta } = docsUtils

    // State
    const formState = useFormState(propSchema, { initialValues: previewProps })

    // -- Render --

    return (
        <View className="relative min-w-400 my-12">
            <pre>
                {JSON.stringify({
                    previewProps,       
                    formState,
                    propMeta,
                }, null, 4)}
            </pre>
        </View>
    )
}
