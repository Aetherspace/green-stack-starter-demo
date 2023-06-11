import { useState, useEffect } from 'react'
// Utils
import { checkURLs } from '../../utils'

/* --- usePreferredURL() ------------------------------------------------------------------- */

const usePreferredURL = (preferredURLS: string[] = [], forcedFallback?: string) => {
  // State
  const [firstAvailableURL, setFirstAvailableURL] = useState('')

  // -- Effects --

  useEffect(() => {
    // Filter out falsy URLs
    const urlsToCheck = preferredURLS.filter((url) => !!url && !url.includes('null'))
    // Check all URLs, but only set the first available one
    const checkAll = async () => {
      const [result] = await checkURLs(urlsToCheck)
      setFirstAvailableURL(result || forcedFallback || '')
    }
    checkAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // -- Return --

  return firstAvailableURL
}

/* --- Exports --------------------------------------------------------------------------------- */

export { usePreferredURL }
export default usePreferredURL
