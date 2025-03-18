import { validateDriver } from '../utils/validateDriver.db.ts'

/* --- Import Driver Methods ------------------------------------------------------------------- */

import { createSchemaModel } from '../utils/createSchemaModel.mock'
import { MockDBEntity } from '../schemas/MockEntity.schema.ts'

/* --- Driver Validation ----------------------------------------------------------------------- */

export const driver = validateDriver({
    createSchemaModel,
    // - Schema Helpers -
    DBEntity: MockDBEntity,
})
