import { AetherspaceLogo } from './AetherspaceLogo'
import { AetherCheckFilled } from './AetherCheckFilled'

/** --- iconRegistry --------------------------------------------------------------------------- */
/** -i- Register any icons by preferred AetherIcon "name" key */
export const iconRegistry = {
  'aetherspace-logo': AetherspaceLogo,
  'check-filled': AetherCheckFilled,
} as const
