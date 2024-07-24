import { useRouter as useNextRouter } from 'next/navigation'
import { UniversalRouterMethods } from './useRouter.types'

/* --- useRouter() -------------------------------------------------------------------- */

export const useRouter = () => {
    // Hooks
    const nextRouter = useNextRouter()

    // -- Helpers --

    const push = (href: string) => nextRouter.push(href)

    const navigate = (href: string) => nextRouter.push(href)

    const replace = (href: string) => nextRouter.replace(href)

    const canGoBack = () => {
        if (typeof window === 'undefined') return true
        return window.history.length > 1
    }

    const setParams = (params: Record<string, string> = {}) => {
        if (typeof window === 'undefined') return
        const url = new URL(window.location.href)
        const search = new URLSearchParams(url.search)
        Object.keys(params).forEach((key) => search.set(key, params[key]))
        url.search = search.toString()
        replace(url.toString())
    }

    // -- Return --

    return {
        push,
        navigate,
        replace,
        back: nextRouter.back,
        canGoBack,
        setParams,
    } as UniversalRouterMethods
}
