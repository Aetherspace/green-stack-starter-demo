/* --- isEmpty() ------------------------------------------------------------------------------- */
// -i- checks for null, undefined & empty strings, objects or arrays
type ObjectType<T = any> = { [key: string]: T }
export const isEmpty = (val: string | any[] | ObjectType | null, failOnEmptyStrings = true): boolean => {
  if (val == null) return true // treat null & undefined as "empty"
  if (typeof val === 'string' && !val.length && failOnEmptyStrings) return true
  if (typeof val === 'object' && !Object.values(val).length) return true // objects & arrays
  return false // not empty
}
