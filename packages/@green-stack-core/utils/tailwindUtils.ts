import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** --- cn() ----------------------------------------------------------------------------------- */
/** -i- Combines an array of classNames but filters out falsy array elements */
export const cn = (...classNames: ClassValue[]) => twMerge(clsx(...classNames))
