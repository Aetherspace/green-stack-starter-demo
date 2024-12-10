
/** --- arrFromSet() --------------------------------------------------------------------------- */
/** -i- Deduplicates items in an array */
export const arrFromSet = <T = any$Unknown>(arr: T[] = []): T[] => Array.from(new Set(arr))

/** --- addSetItem() --------------------------------------------------------------------------- */
/** -i- Adds an item to array if it doens't exist already */
export const addSetItem = <T = any$Unknown>(arr: T[] = [], item: T): T[] => {
    if (!arr.map((itm) => JSON.stringify(itm)).includes(JSON.stringify(item))) arr.push(item)
    return arr
}

/** --- removeSetItem() ------------------------------------------------------------------------ */
/** -i- Removes an item from an array */
export const removeSetItem = <T = any$Unknown>(arr: T[] = [], item: T): T[] => {
    return arr.filter((itm) => itm !== item)
}

/** --- toggleArrayItem() ------------------------------------------------------------------------ */
/** -i- Adds or removes an item from an array */
export const toggleArrayItem = <T = any$Unknown>(arr: T[] = [], item: T): T[] => {
    if (arr.includes(item)) return arr.filter((itm) => itm !== item)
    return [...arr, item]
}

/** --- createLookup() ------------------------------------------------------------------------- */
/** -i- Create a lookup object from an array of objects and a property key to index it for */
export const createLookup = <T extends Record<K, any$Unknown>, K extends keyof T>(array: T[], key: K) => {
    return array.reduce(
        (lookup, current) => {
            const keyValue = current[key]
            if (!keyValue) return lookup // Skip if the item doesn't have a value for the key
            return { ...lookup, [keyValue]: current }
        },
        {} as Record<T[K], T>
    )
}
