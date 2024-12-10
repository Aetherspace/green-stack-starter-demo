import { z } from '@green-stack/schemas'

/* --- Schema ---------------------------------------------------------------------------------- */

export const DbDriverSchema = z.object({
    createSchemaModel: z.function().args(
        z.instanceof(z.ZodObject<z.ZodRawShape>),
        z.string().optional(),
    ),
})

/* --- Types ----------------------------------------------------------------------------------- */

export type DbDriverShape = z.infer<typeof DbDriverSchema>

/** --- validateDriver() ----------------------------------------------------------------------- */
/** -i- Validates whether a DB driver matches the expected methods */
export const validateDriver = <DB_DRIVER extends DbDriverShape>(driver: DB_DRIVER) => {
    DbDriverSchema.parse(driver)
    return driver
}
