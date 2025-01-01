import { useState, useEffect } from 'react'
import { isWeb } from '@app/config'
import { usePrevious } from './usePrevious'

/* --- Constants ------------------------------------------------------------------------------- */

const DEFAULT_BEHAVIOR_KEYS = [' ', 'Enter', 'ArrowUp', 'ArrowDown']

/* --- useFocusedPress() ----------------------------------------------------------------------- */

export const useFocusedPress = <K extends string>(
    keys: Array<K>,
    onKeyPress: (key?: K) => void,
) => {
    // State
    const [isFocused, setIsFocused] = useState(false)

    // Hooks
    const prevFocused = usePrevious(isFocused)

    // -- Effects --local

    useEffect(() => {
        // Flags
        const focusDidChange = prevFocused !== isFocused

        // Ignore if not on web, not focused, or no change
        if (!focusDidChange || !isFocused || !isWeb) return

        // Keydown handler
        const onKeyDown = (e: KeyboardEvent) => {
            if (keys.includes(e.key as K)) {
                // Skip default behavior for space and enter
                if (DEFAULT_BEHAVIOR_KEYS.includes(e.key)) e.preventDefault?.()
                // Call handler
                onKeyPress(e.key as K)
            }
        }

        // Attach event listeners
        window?.addEventListener('keydown', onKeyDown)

        // Detach event listeners
        return () => window?.removeEventListener('keydown', onKeyDown)
    }, [isFocused, onKeyPress])

    // -- Skip if not web --

    if (!isWeb) return {}

    // -- Resources --

    return {
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
    }
}
