import { ComponentProps } from 'react'
import { Image } from 'expo-image'
// Schemas
import { TAetherStyleProps } from '../../schemas/ats'

/* --- Types ----------------------------------------------------------------------------------- */

export type AetherImageType = Partial<ComponentProps<typeof Image>> &
  TAetherStyleProps & {
    style?: ComponentProps<typeof Image>['style']
    src?: string
    alt?: string
    width?: number
    height?: number
    quality?: number | string | any
    priority?: boolean
    loading?: 'lazy' | 'eager'
  }
