import { isEmpty } from './commonUtils'
import { isValidNumber } from './numberUtils'
import { getProperty, setProperty, deleteProperty, hasProperty, deepKeys } from 'dot-prop'
export { createLookup } from './arrayUtils'

/* --- Reexports ------------------------------------------------------------------------------- */

export { getProperty, setProperty, deleteProperty, hasProperty, deepKeys }

/** --- parseUrlParamsObject() ----------------------------------------------------------------- */
/** -i- Parses object property values like "1" to 1, and "true" to true.
 ** Keys with '.' in them will be treated and parsed like objects
 ** Key with '[' or ']' in them will be treated and parsed like arrays */
export const parseUrlParamsObject = (
    objToValidate: ObjectType<any$Unknown> = {},
    ignoredKeys: string[] = []
): ObjectType => {
    const obj: typeof objToValidate = {}
    Object.keys(objToValidate).map((propKey) => {
        // Util
        const parseVal = (val: any$Unknown) => {
            // Normalize 'true' / 'false' to their boolean values
            if (['true', 'false'].includes(val)) val = JSON.parse(val)
            // Normalize stringified numbers to actual number
            else val = Array.isArray(val) || !isValidNumber(val) ? val : +val
            // In case of nested objects, use recursion
            if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
                val = parseUrlParamsObject(val, ignoredKeys)
            }
            // Return
            return val
        }
        // Add value under same key to obj
        let val = parseVal(objToValidate[propKey])
        const shouldIgnore = ignoredKeys.includes(propKey)
        if (shouldIgnore) val = objToValidate[propKey]
        else setProperty(obj, propKey, val)
    })
    return obj
}

/** --- buildUrlParamsObject() ----------------------------------------------------------------- */
/** -i- Builds an object with all array and object keys flattened.
 ** Essentially the opposite of `parseUrlParamsObject()`
 * @example { arr: [0, 2] } // -> { 'arr[0]': 0, 'arr[1]': 2 }
 * @example { obj: { prop: true } } // -> { 'obj.prop': true } */
export const buildUrlParamsObject = (obj: ObjectType<any$Unknown> = {}) => {
    const newObj: ObjectType<any$Unknown> = {}
    deepKeys(obj).map((key) => {
        const val = getProperty(obj, key)
        if (!isEmpty(val)) newObj[key] = val
    })
    return newObj
}
