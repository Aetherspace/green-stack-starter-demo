import { useLocalSearchParams } from 'expo-router'
import type { UniversalRouteScreenProps } from './useUniversalRouteParams.types'

/** --- useUniversalRouteParams() -------------------------------------------------------------- */
/** -i- Gets the route search and query params on both web and mobile */
export const useUniversalRouteParams = (routeScreenProps: UniversalRouteScreenProps) => {
  const { params, searchParams } = routeScreenProps
  const expoRouterParams = useLocalSearchParams()
  return {
    ...params,
    ...searchParams,
    ...expoRouterParams,
  } as typeof expoRouterParams
}
