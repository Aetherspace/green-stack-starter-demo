// Utils
const { round, ceil, floor } = Math

/* --- roundTo() ------------------------------------------------------------------------------- */
// -i- Uses scientific string notation to round numbers (up or down) to specific decimals
export const roundTo = (value: number | string, decimals = 0, roundFn: any = round) => {
  return +`${roundFn(`${value}e+${decimals}`)}e-${decimals}`
}

export const roundUpTo = (value: number | string, decimals = 0) => roundTo(value, decimals, ceil)
export const roundDownTo = (value: number | string, decimals = 0) => roundTo(value, decimals, floor)

/* --- roundPrice() ---------------------------------------------------------------------------- */
// -i- Round for USD / EUR / GBP price formatting
export const roundPrice = (priceVal: number) => roundTo(priceVal, 2)

/* --- hasLeadingZeroes() ---------------------------------------------------------------------- */
// -i- Detect leading zeroes in "numbers"
export const hasLeadingZeroes = (numString: string | number): boolean => {
  return Number(numString).toString() !== numString
}

/* --- isValidNumber() ------------------------------------------------------------------------- */
// -i- check if a string is a valid number, excluding leading zeroes
// -i- Allowed: numbers & number strings "0", "1", "250", "0.123"
// -i- Catches: non numbers & leading zeroes "0568"
// -i- JavaScript ¯\_(ツ)_/¯
export const isValidNumber = (numCandidate: any): boolean =>
  ![true, false, null].includes(numCandidate as unknown as boolean) &&
  !Array.isArray(numCandidate) &&
  !Number.isNaN(+numCandidate) &&
  !hasLeadingZeroes(numCandidate)
