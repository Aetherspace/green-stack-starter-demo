import { z, aetherSchema } from './aetherSchemas'

/** --- AetherTailwindProp --------------------------------------------------------------------- */
/** -i- A common prop type for Aetherspace Primitives used for styling through the 'tw', 'class' or 'className' props */
export const AetherTailwindProp = z.union([
  z.string(),
  z.array(z.union([z.string(), z.literal(0)]).nullish()),
])

/** -i- A common prop type for Aetherspace Primitives used for styling through the 'tw', 'class' or 'className' props */
export type TAetherTailwindProp = z.infer<typeof AetherTailwindProp>

/** --- AetherStyleProps ----------------------------------------------------------------------- */
/** -i- All common extra props used in Aetherspace Primitives for styling */
export const AetherStyleProps = aetherSchema('AetherStyleProps', {
  tw: AetherTailwindProp.optional(),
  class: AetherTailwindProp.optional(),
  className: AetherTailwindProp.optional(),
  twID: z.string().optional(),
})

/** -i- All common extra props used in Aetherspace Primitives for styling */
export type TAetherStyleProps = z.infer<typeof AetherStyleProps>
