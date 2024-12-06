import { validateDriver } from '../utils/validateDriver.db.ts'

/* --- Import Driver Methods ------------------------------------------------------------------- */

import { createSchemaModel } from '../utils/createSchemaModel.mock'

/* --- Driver Validation ----------------------------------------------------------------------- */

export const driver = validateDriver({
    createSchemaModel,
})
