import { useState, useEffect } from 'react'

/** --- useDidMount() --------------------------------------------------------------------------- */
/** -i- Returns whether mounted, optionally pass a callback to execute on component mount
 ** Can help with fixing hydration mismatch errors */
export const useDidMount = (callback?: () => void) => {
    // State
    const [didMount, setDidMount] = useState(false)

    // -- Effects --

    useEffect(() => {
        // Set didMount to true
        setDidMount(true)
        // Run callback if provided
        callback?.()
    }, [])

    // -- Return --

    return didMount
}
