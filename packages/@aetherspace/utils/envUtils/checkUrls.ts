import axios from 'axios'

/** --- checkURL() ----------------------------------------------------------------------------- */
/** -i- Check a single URL */
export const checkURL = async (url: string) => {
  try {
    const res = await axios.get(url)
    return res.status === 200 && url
  } catch (error) {
    return false
  }
}

/** --- checkURLs() ---------------------------------------------------------------------------- */
/** -i- Check multiple URLs */
export const checkURLs = async (urls: string[]) => {
  const results = await Promise.all(urls.map((url) => checkURL(url)))
  return results.filter(Boolean) as string[]
}
