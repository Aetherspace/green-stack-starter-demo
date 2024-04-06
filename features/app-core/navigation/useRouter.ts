import { router } from 'expo-router'
import { UniversalRouterMethods } from './useRouter.types'

/* --- useRouter() ----------------------------------------------------------------------------- */

export const useRouter = () => {
    return {
        push: router.push,
        navigate: router.navigate,
        replace: router.replace,
        back: router.back,
        canGoBack: router.canGoBack,
        setParams: router.setParams,
    } as UniversalRouterMethods
}
