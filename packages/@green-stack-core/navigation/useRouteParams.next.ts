import type { useLocalSearchParams } from 'expo-router'
import type { UniversalRouteScreenProps } from './useRouteParams.types'
import { normalizeObjectProps } from '../utils/objectUtils'

/** --- useRouteParams() ----------------------------------------------------------------------- */
/** -i- Gets the route search and query params on both web and mobile */
export const useRouteParams = (routeScreenProps: UniversalRouteScreenProps) => {
  const { params, searchParams } = routeScreenProps
  return normalizeObjectProps({
    ...params,
    ...searchParams
  }) as ReturnType<typeof useLocalSearchParams>
}
