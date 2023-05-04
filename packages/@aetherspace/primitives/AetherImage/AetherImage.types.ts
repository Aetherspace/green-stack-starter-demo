import { ComponentProps } from 'react'
import { Image } from 'react-native'

/* --- Types ----------------------------------------------------------------------------------- */

export interface AetherImageType extends Partial<ComponentProps<typeof Image>> {
  style?: ComponentProps<typeof Image>['style']
  tw?: string | (string | null | undefined | false | 0)[]
  twID?: string
  class?: string | (string | null | undefined | false | 0)[]
  className?: string | (string | null | undefined | false | 0)[]
  src?: string
  alt?: string
  width?: number
  height?: number
  quality?: number | string | any
  priority?: boolean
  loading?: 'lazy' | 'eager'
}
