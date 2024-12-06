import { dbDrivers } from '@app/registries/drivers.generated'
import { appConfig } from '@app/config'

/* --- Determine Main DB driver ---------------------------------------------------------------- */

const dbDriver = dbDrivers[appConfig.drivers.db]

/* --- Re-export Driver Methods ---------------------------------------------------------------- */

export const createSchemaModel = dbDriver['createSchemaModel']

/* --- Export Driver Helpers ------------------------------------------------------------------- */

export { validateDriver } from './utils/validateDriver.db.ts'
export { validateDriverModel } from './utils/validateDriverModel.db.ts'
