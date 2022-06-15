import { useState, useEffect } from 'react'
import axios from 'axios'

/* --- usePrefferredURL() ------------------------------------------------------------------- */

const usePrefferredURL = (preferredURLS: string[] = []) => {
  // State
  const [firstAvailableURL, setFirstAvailableURL] = useState('')

  // -- Effects --

  useEffect(() => {
    // Filter out falsy URLs
    const urlsToCheck = preferredURLS.filter(Boolean)
    // Check URL, move on to next if unavailable
    const checkUriIndex = async (index = 0) => {
      try {
        // If we've hit the end, stop checking
        if (index >= urlsToCheck.length) return
        // Attempt to contact docs
        const response = await axios.get(urlsToCheck[index])
        // If unavailable, check the next URI
        if (response?.status !== 200) return checkUriIndex(index + 1)
        // If we do get a response, set as docs URI
        return setFirstAvailableURL(urlsToCheck[index])
      } catch (error) {
        // Failed to fetch, check next URI
        return checkUriIndex(index + 1)
      }
    }
    // Kickoff checking the list
    checkUriIndex(0)
  }, [preferredURLS.join('-')])

  // -- Return --

  return firstAvailableURL
}

/* --- Exports --------------------------------------------------------------------------------- */

export { usePrefferredURL }
export default usePrefferredURL
