import { iconRegistry as aetherIcons } from './aetherspace/registry'

/** --- iconRegistry --------------------------------------------------------------------------- */
/** -i- Register any icons by preferred AetherIcon "name" key */
export const iconRegistry = {
  ...aetherIcons,
} as const
