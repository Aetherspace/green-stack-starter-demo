/* --- addSetItem() ------------------------------------------------------------------------------ */
// -i- Adds an item to array if it doens't exist already
export const addSetItem = (arr: any[], item: any): any[] => {
  if (!arr.map((itm) => JSON.stringify(itm)).includes(JSON.stringify(item))) arr.push(item)
  return arr
}

/* --- arrFromSet() ------------------------------------------------------------------------------ */
// -i- Deduplicates items in an array
export const arrFromSet = (arr: any[]): any[] => Array.from(new Set(arr))
