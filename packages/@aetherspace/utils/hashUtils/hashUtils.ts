/* --- hashCode() ------------------------------------------------------------------------------ */
// -i- Turns any string into a short unique identifier / number
export const hashCode = (str: string) => Array.from(str).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0), 0)

/* --- createKey() ----------------------------------------------------------------------------- */
// -i- Creates a react key by strigifying an object
// -i- Used for invalidating keys (creating new component instance) when needing to synch state & props
export const createKey = (obj: any, hash = true) => {
  const keyString = JSON.stringify(obj).replace(/([\s.*+?^=!:$,<>{}()|[\]/\\"])/g, '')
  return hash ? hashCode(keyString) : keyString
}

/* --- uuid() ---------------------------------------------------------------------------------- */
// -i- Create a unique id
export const uuid = () => {
  let d = new Date().getTime()
  // @ts-ignore
  if (typeof window !== 'undefined' && window.performance && window.performance.now) d += performance.now()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0 // eslint-disable-line no-bitwise
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16) // eslint-disable-line no-bitwise
  })
}
