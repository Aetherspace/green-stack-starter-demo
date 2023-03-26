import { useSearchParams } from 'expo-router'

/* --- Types ----------------------------------------------------------------------------------- */

type RoutePropsType = {
  [key: string]: unknown
  params?: Record<string, unknown>
}

/** --- useRouteParams() ----------------------------------------------------------------------- */
/** -i- Get the route params from the expo (mobile) or next (web) router */
export const useRouteParams = (props: Partial<RoutePropsType>) => {
  const searchParams = useSearchParams()
  const params = { ...props.params, ...searchParams }
  return { params, searchParams }
}
