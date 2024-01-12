import { useSearchParams } from 'expo-router'
import { RoutePropsType } from './useRouteParams.types'

/** --- useRouteParams() ----------------------------------------------------------------------- */
/** -i- Get the route params from the expo (mobile) or next (web) router */
export const useRouteParams = (props: Partial<RoutePropsType>) => {
  const searchParams = useSearchParams()
  const params = { ...props.params, ...searchParams }
  return { params, searchParams }
}
