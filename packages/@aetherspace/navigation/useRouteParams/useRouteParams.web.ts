import { useSearchParams } from 'next/navigation'
// Types
import { RoutePropsType } from './useRouteParams.types'

/** --- useRouteParams() ----------------------------------------------------------------------- */
/** -i- Get the route params from the expo (mobile) or next (web) router */
export const useRouteParams = (props: Partial<RoutePropsType>) => {
  const routeParams = props.params || {}
  const search = useSearchParams()
  const searchParams = Object.fromEntries(search.entries())
  const params = { ...routeParams, ...searchParams }
  return { params, searchParams }
}
