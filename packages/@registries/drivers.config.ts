// -i- Auto generated with "npx turbo run @green-stack/core#collect-drivers"

/* --- Constants ------------------------------------------------------------------------------- */

export const DRIVER_OPTIONS = {
    db: {
        mockDB: 'mock-db',
    }
} as const

/* --- Types ----------------------------------------------------------------------------------- */

export type DRIVER_CONFIG = {
    db: typeof DRIVER_OPTIONS['db'][keyof typeof DRIVER_OPTIONS['db']]
}

export type DRIVER_KEYS = keyof typeof DRIVER_OPTIONS

/* --- Helpers --------------------------------------------------------------------------------- */

export const createDriverConfig = <D extends DRIVER_CONFIG>(config: D) => config
