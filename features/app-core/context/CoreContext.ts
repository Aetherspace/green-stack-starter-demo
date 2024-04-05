import React from 'react'
import { UniversalLinkProps } from '../navigation/Link.types'
import { UniversalRouterMethods } from '../navigation/useRouter.types'
import { UniversalRouteScreenProps } from '../navigation/useRouteParams.types'
import type { useLocalSearchParams } from 'expo-router'

// -i- This context's only aim is to provide React Portability & Framework Ejection patterns if required
// -i- By allowing you to provide your own custom Link and Router overrides, you could e.g.:
// -i- 1) Support Expo for Web by not defaulting to Next.js's Link and Router on web
// -i- 2) Eject from Next.js entirely and e.g. use another framework's Link component and Router

/* --- Types ----------------------------------------------------------------------------------- */

export type CoreContextType = {
    contextLink: (props: UniversalLinkProps) => JSX.Element
    contextRouter: UniversalRouterMethods
    useContextRouteParams: (routeScreenProps: UniversalRouteScreenProps) => ReturnType<typeof useLocalSearchParams>
}

/* --- Context --------------------------------------------------------------------------------- */

export const CoreContext = React.createContext<CoreContextType>({
    contextLink: null,
    contextRouter: null,
    useContextRouteParams: () => ({}),
})
