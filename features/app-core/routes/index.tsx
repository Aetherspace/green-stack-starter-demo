import { UniversalRouteScreen } from '../navigation/UniversalRouteScreen'
import HomeScreen, { queryBridge } from '../screens/HomeScreen'

/* --- / --------------------------------------------------------------------------------------- */

export default (props: any) => (
    <UniversalRouteScreen
        {...props}
        routeScreen={HomeScreen}
        queryBridge={queryBridge}
    />
)
