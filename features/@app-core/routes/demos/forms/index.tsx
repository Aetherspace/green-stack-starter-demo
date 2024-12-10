import { UniversalRouteScreen } from '@green-stack/core/navigation/UniversalRouteScreen'
import FormsScreen from '../../../screens/FormsScreen'

/* --- /images --------------------------------------------------------------------------------- */

export default (props: any) => (
    <UniversalRouteScreen
        {...props}
        routeScreen={FormsScreen}
    />
)

/* --- Exports --------------------------------------------------------------------------------- */

export const dynamic = 'force-dynamic'
