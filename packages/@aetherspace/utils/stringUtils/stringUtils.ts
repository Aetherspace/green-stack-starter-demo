/* --- Case Utils ------------------------------------------------------------------------------ */
export const snakeToCamel = (str: string) => str.replace(/(_\w)/g, (m) => m[1].toUpperCase())
export const snakeToDash = (str: string) => str.replace(/_/g, '-')
export const dashToCamel = (str: string) => str.replace(/(-\w)/g, (m) => m[1].toUpperCase())
export const dashToSnake = (str: string) => str.replace(/-/g, '_')
export const camelToSnake = (str: string) => str.replace(/[\w]([A-Z])/g, (m) => `${m[0]}_${m[1]}`).toLowerCase() // prettier-ignore
export const camelToDash = (str: string) => str.replace(/[\w]([A-Z])/g, (m) => `${m[0]}-${m[1]}`).toLowerCase() // prettier-ignore

/* --- uppercaseFirstChar() -------------------------------------------------------------------- */
// -i- Uppercase the first character of a string
export const uppercaseFirstChar = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

/* --- getAssetKey() --------------------------------------------------------------------------- */
// -i- Transform a file path like '/imgs/someImage.png' into an object key like 'ImgsSomeImagePng'
export const getAssetKey = (srcAttrPath: string) => {
  const [ext, src] = srcAttrPath.split('.').reverse()
  const srcParts = src.split('/')
  const key = [...srcParts, ext].reduce((acc, part) => `${acc}${uppercaseFirstChar(part)}`, '')
  return dashToCamel(key)
}

/* --- replaceStringVars() --------------------------------------------------------------------- */
// -i- Replaces placeholders like {somevar} or [somevar] with values from injectables
export const replaceStringVars = (
  stringWithPlaceholders: string,
  injectables: Record<string, string | number>
) => {
  let result = stringWithPlaceholders
  Object.keys(injectables).forEach((key) => {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), injectables[key].toString()) // prettier-ignore
    result = result.replace(new RegExp(`\\[${key}\\]`, 'g'), injectables[key].toString()) // prettier-ignore
  })
  return result
}

/* --- findTargetString() ---------------------------------------------------------------------- */
// -i- Finds a $target$ string inside another string
export const findTargetString = (source: string, search = '($target$)') => {
  const [preTarget, postTarget] = search.split('$target$')
  const parts = source.split(preTarget)
  const target = parts.pop()?.split(postTarget)?.[0]
  return target
}
