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
    // Check URL, move on to next if unavailable
    const checkAll = async () => {
      const [result] = await checkURLs(urlsToCheck)
      setFirstAvailableURL(result || forcedFallback || '')
    }
    // Kickoff checking the list
    checkAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // -- Return --

  return firstAvailableURL
}

/* --- Exports --------------------------------------------------------------------------------- */

export { usePreferredURL }
export default usePreferredURL
