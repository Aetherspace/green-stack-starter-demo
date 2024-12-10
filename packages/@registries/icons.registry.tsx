import * as appCoreIcons from '../../features/@app-core/icons'

/* --- Exports --------------------------------------------------------------------------------- */

export const REGISTERED_ICONS = {
    ...appCoreIcons,
} as const

/* --- Types ----------------------------------------------------------------------------------- */

export type REGISTERED_ICONS = keyof typeof REGISTERED_ICONS

export { IconProps } from '../@green-stack-core/svg/svg.primitives'
