import { getDebuggerURL, getEnvVar } from 'aetherspace/utils/envUtils'
import axios from 'axios'

/* --- Constants ------------------------------------------------------------------------------- */

const APP_LINKS: string[] = getEnvVar('APP_LINKS')?.split('|') || []
const [WEBDOMAIN] = APP_LINKS.filter((link) => link.includes('http://') || link.includes('https://')) // prettier-ignore
export const BACKEND_URL: string = getEnvVar('BACKEND_URL') || ''
export const BASE_URL: string = getDebuggerURL(3000) || BACKEND_URL || WEBDOMAIN || ''

/* --- fetchAetherProps() ---------------------------------------------------------------------- */

export const fetchAetherProps = async (query: string, variables: any, baseUrl = BASE_URL) => {
  const { data } = await axios.post(`${baseUrl}/api/graphql`, { query, variables })
  return data
}
