import type { useLocalSearchParams } from 'expo-router'
import type { UniversalRouteScreenProps } from './useRouteParams.types'

/** --- useRouteParams() ----------------------------------------------------------------------- */
/** -i- Gets the route search and query params on both web and mobile */
export const useRouteParams = (routeScreenProps: UniversalRouteScreenProps) => {
  const { params, searchParams } = routeScreenProps
  return { ...params, ...searchParams } as ReturnType<typeof useLocalSearchParams>
}
