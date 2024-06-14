
/** --- addSetItem() --------------------------------------------------------------------------- */
/** -i- Adds an item to array if it doens't exist already */
export const addSetItem = (arr: any$Unknown[], item: any$Unknown): any$Unknown[] => {
    if (!arr.map((itm) => JSON.stringify(itm)).includes(JSON.stringify(item))) arr.push(item)
    return arr
}

/** --- arrFromSet() --------------------------------------------------------------------------- */
/** -i- Deduplicates items in an array */
export const arrFromSet = (arr: any$Unknown[]): any$Unknown[] => Array.from(new Set(arr))

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
