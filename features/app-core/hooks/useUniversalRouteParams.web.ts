/** --- useUniversalRouteParams() -------------------------------------------------------------- */
/** -i- Gets the route search and query params on both web and mobile */
export const useUniversalRouteParams = (routeScreenProps: Record<string, unknown>) => {
  const { params } = routeScreenProps
  return params
}
