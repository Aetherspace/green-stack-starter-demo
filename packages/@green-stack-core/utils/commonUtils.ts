/* --- Constants ------------------------------------------------------------------------------- */

const LOGS: string[] = []

/** --- isEmpty() ------------------------------------------------------------------------------ */
/** -i- checks for null, undefined & empty strings, objects or arrays */
export const isEmpty = (
    val?: string | any[] | ObjectType | null,
    failOnEmptyStrings = true
): boolean => {
    if (val == null) return true // treat null & undefined as "empty"
    if (typeof val === 'string' && !val.length && failOnEmptyStrings) return true
    if (typeof val === 'object' && !Object.values(val).length) return true // objects & arrays
    return false // not empty
}

/** --- consoleOnce() ------------------------------------------------------------------------------ */
/** -i- Log out to the console only once, skip on subsequent logs. Good for one-off messages. */
export const consoleOnce = (message: string, logger = console.log, ...restMessages: any$Unknown[]) => {
    if (!LOGS.includes(message)) {
        logger(message)
        LOGS.push(message)
    }
}

/** --- logOnce() ------------------------------------------------------------------------------ */
/** -i- Log out to the console only once, skip on subsequent logs. Good for one-off messages. */
export const logOnce = (message: string, ...restMessages: any$Unknown[]) => {
    return consoleOnce(message, console.log, ...restMessages)
}

/** --- warnOnce() ----------------------------------------------------------------------------- */
/** -i- Error to the console only once, skip on subsequent logs. Good for one-off warnings. */
export const warnOnce = (message: string, ...restMessages: any$Unknown[]) => {
    return consoleOnce(message, console.warn, ...restMessages)
}

/** --- errorOnce() ---------------------------------------------------------------------------- */
/** -i- Warn to the console only once, skip on subsequent logs. Good for one-off errors. */
export const errorOnce = (message: string, ...restMessages: any$Unknown[]) => {
    return consoleOnce(message, console.error, ...restMessages)
}
