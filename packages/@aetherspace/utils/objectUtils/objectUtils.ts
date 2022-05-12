// Utils
import { isValidNumber } from '../numberUtils'

/* --- Types ----------------------------------------------------------------------------------- */
type ObjectType = { [key: string]: any }

/* --- objectifier() --------------------------------------------------------------------------- */
// -i- Utility method to get and set nested objects that may or may not exist
// -i- (Drop in replacement for optional chaining until we add support for it)
export const objectifier = (contextTree: ObjectType, parts: string[], create = false): ObjectType | undefined => {
  let branch: undefined | ObjectType = contextTree
  let current
  let index = 0
  // Go as deep into obj as the number of parts
  while (index < parts.length) {
    current = parts[index]
    try {
      // Skip null & undefined + check if the next branch actually exists
      const propExists: boolean = typeof branch?.[current] !== 'undefined'
      branch = branch && propExists ? branch[current] : branch && create ? (branch[current] = {}) : undefined
    } catch (err) {
      branch = undefined
    }
    index++
  }
  // Return result
  return branch
}

/* --- setProp() ------------------------------------------------------------------------------ */
// -i- Set potentially nested property by keys like 'a.b.c'
// -!- Mutates the object directly, but also returns it again
export const setProp = (obj: ObjectType, key: string, val: unknown): ObjectType => {
  const parts = key.split('.')
  const last = parts.pop()
  const result = objectifier(obj, parts, true)
  if (result && last) result[last] = val
  return obj
}

/* --- getProp() ------------------------------------------------------------------------------ */
// -i- Retrieve potentially nested property by keys like 'prop.subProp.valueYouWant'
// -i- (Drop in replacement for optional chaining until we add support for it)
export const getProp = <T extends ObjectType>(obj: ObjectType | null, key: string): T | undefined => {
  if (!key) return undefined
  const parts = key.split('.')
  const last = parts.pop()
  const result = !!obj && objectifier(obj, parts, false)
  return result && last ? result[last] : undefined
}

/* --- getFromSources() ------------------------------------------------------------------------ */
// -i- Get a property from a preferred source of options (= objects)
export const getFromSources = (key: string, sources: { [key: string]: any }[]) => {
  const [result] = sources.map((srcObj) => srcObj?.[key]).filter(Boolean)
  return result
}

/* --- normalizeObjectProps() ------------------------------------------------------------------ */
// -i- Parses object properties like "1" to 1, and "true" to true
export const normalizeObjectProps = (objToValidate: ObjectType = {}, ignoredKeys: string[] = []): ObjectType => {
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
