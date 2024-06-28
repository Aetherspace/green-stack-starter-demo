// -i- Auto generated with "npx turbo run @green-stack/core#collect-drivers"
import { driver as mockDbDriver } from '@db/driver/drivers/mock.db'

/* --- DB -------------------------------------------------------------------------------------- */

export const dbDrivers = {
    'mock-db': mockDbDriver,
}

/* --- All Drivers ----------------------------------------------------------------------------- */

export const drivers = {
    db: dbDrivers,
}
