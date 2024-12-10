import { useState, useEffect } from 'react'

/** --- usePrevious() -------------------------------------------------------------------------- */
/** -i- Keep track of the previous value for any given value */
export const usePrevious = <T>(value: T): T => {
    // State
    const [prev, setPrev] = useState<T>(value)

    // Only update in an effect cleanup, as this happens on the next state update (safer than refs)
    useEffect(() => () => setPrev(value), [value])

    // Return
    return prev
}
