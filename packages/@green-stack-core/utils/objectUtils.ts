import { isValidNumber } from './numberUtils'
export { getProperty, setProperty, deleteProperty, hasProperty, deepKeys } from 'dot-prop'
export { createLookup } from './arrayUtils'

/** --- normalizeObjectProps() ----------------------------------------------------------------- */
/** -i- Parses object properties like "1" to 1, and "true" to true */
export const normalizeObjectProps = (
    objToValidate: ObjectType<any$Unknown> = {},
    ignoredKeys: string[] = []
): ObjectType => {
    const obj: typeof objToValidate = {}
    Object.keys(objToValidate).forEach((pKey) => {
        let val = objToValidate[pKey]
        // Normalize 'true' / 'false' to their boolean values
        if (['true', 'false'].includes(val)) val = JSON.parse(val)
        // Normalize stringified numbers to actual number
        else val = Array.isArray(val) || !isValidNumber(val) ? val : +val
        // In case of nested objects, use recursion
        if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
            val = normalizeObjectProps(val, ignoredKeys)
        }   
        // Add value under same key to obj
        obj[pKey] = ignoredKeys.includes(pKey) ? objToValidate[pKey] : val
    })
    return obj
}
