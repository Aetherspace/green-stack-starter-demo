import { router } from 'expo-router'
import { UniversalRouterMethods } from './useUniversalRouter.types'

/* --- useUniversalRouter() -------------------------------------------------------------------- */

export const useUniversalRouter = () => {
    return {
        push: router.push,
        navigate: router.navigate,
        replace: router.replace,
        back: router.back,
        canGoBack: router.canGoBack,
        setParams: router.setParams,
    } as UniversalRouterMethods
}
