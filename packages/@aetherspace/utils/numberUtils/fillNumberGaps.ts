/* --- fillNumberGaps() ------------------------------------------------------------------------ */
// -i- Fills null values in arrays of numbers with their interpolated values
// -i- e.g. fillNumberGaps([0, null, 10]) => [0, 5, 10]
// -i- Skips starting and ending null gaps
// -i- e.g. fillNumberGaps([null, 1, null, null, null, 5, null]) => [null, 1, 2, 3, 4, 5, null]
// -i- Handy for bridging gaps in charts with missing data
export const fillNumberGaps = (numberArray: (number | null)[]) => {
  // Start with empty gap info
  let gap: Record<string, number> & { nextNumbers?: (number | null)[] } = {}
  // Fill in gaps
  return numberArray.map((currentNumber, index) => {
    // Known numbers stay the same
    if (currentNumber !== null) {
      if (Object.values(gap).length > 0) gap = {} // Empty gap info?
      return currentNumber
    }
    // Skip starting gaps
    if (!gap.previousNumber && numberArray[index - 1] == null) return null
    // Refill gap info when reached next gap?
    if (Object.values(gap).length === 0) {
      // Edge info
      gap.previousNumber = numberArray[index - 1] as unknown as number
      gap.nextNumbers = numberArray.slice(index, numberArray.length) // prettier-ignore
      gap.nextNumber = gap.nextNumbers.find((number_) => number_ !== null) as unknown as number // prettier-ignore
      // Distance info
      gap.start = index - 1
      gap.steps = gap.nextNumbers.indexOf(gap.nextNumber) + 1 // e.g. 3 steps until known value = 2 null values until then
      gap.distance = gap.nextNumber - gap.previousNumber
    }
    // Skip ending gaps
    if (typeof gap.nextNumber === 'undefined') return currentNumber
    // Calculate interpolated step value
    const gapStep = index - gap.start
    const gapPercentage = gapStep / gap.steps // e.g. 50% for step 1/2 ... or 33% for step 1/3
    // Result
    return gap.previousNumber + gap.distance * gapPercentage
  })
}

/* --- Exports --------------------------------------------------------------------------------- */

export default fillNumberGaps
