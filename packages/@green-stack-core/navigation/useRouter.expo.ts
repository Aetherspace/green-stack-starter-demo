import { router } from 'expo-router'
import { UniversalRouterMethods } from './useRouter.types'
import { buildUrlParamsObject } from '../utils/objectUtils'

/* --- useRouter() ----------------------------------------------------------------------------- */

export const useRouter = () => {
    return {
        push: router.push,
        navigate: router.navigate,
        replace: router.replace,
        back: router.back,
        canGoBack: router.canGoBack,
        setParams: (newParams: Record<string, any$Unknown> = {}) => {
            return router.setParams(buildUrlParamsObject(newParams))
        },
    } as UniversalRouterMethods
}
