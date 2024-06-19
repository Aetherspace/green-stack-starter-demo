import { z, schema } from '@green-stack/schemas'

/* --- Schemas --------------------------------------------------------------------------------- */

export const HealthCheckArgs = schema('HealthCheckArgs', {
   echo: z.string().default('Hello World'),
   showContext: z.boolean().default(false),
})

/* --- Type Alias ------------------------------------------------------------------------------ */

export type HealthCheckArgs = z.infer<typeof HealthCheckArgs>
