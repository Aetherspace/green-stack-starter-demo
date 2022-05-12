// Primitives
import { AetherView, AetherText } from 'aetherspace/primitives'

/* --- <OfflineScreen/> ------------------------------------------------------------------------ */

const OfflineScreen = () => (
  <AetherView tw="flex-1 bg-white items-center justify-center">
    <AetherText tw="text-red-700 pb-5 font-bold text-base">Uh-oh</AetherText>
    <AetherText tw="px-5 text-center text-sm">You seem to be offline</AetherText>
  </AetherView>
)

/* --- Exports --------------------------------------------------------------------------------- */

export default OfflineScreen
