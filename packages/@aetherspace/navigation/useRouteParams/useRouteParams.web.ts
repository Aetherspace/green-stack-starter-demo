import { useSearchParams } from 'next/navigation'

/* --- Types ----------------------------------------------------------------------------------- */

type RoutePropsType = {
  [key: string]: unknown
  params?: Record<string, unknown>
}

/** --- useRouteParams() ----------------------------------------------------------------------- */
/** -i- Get the route params from the expo (mobile) or next (web) router */
export const useRouteParams = (props: Partial<RoutePropsType>) => {
  const routeParams = props.params || {}
  const search = useSearchParams()
  const searchParams = Object.fromEntries(search.entries())
  const params = { ...routeParams, ...searchParams }
  return { params, searchParams }
}
