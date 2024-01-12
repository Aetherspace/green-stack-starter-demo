import { getDebuggerURL, getEnvVar } from '../../utils/envUtils'
import axios from 'axios'
import { AetherFetcherOptions } from './fetchAetherProps.types'

/* --- Constants ------------------------------------------------------------------------------- */

const APP_LINKS: string[] = getEnvVar('APP_LINKS')?.split('|') || []
const [WEBDOMAIN] = APP_LINKS.filter((link) => link.includes('http://') || link.includes('https://')) // prettier-ignore
export const BACKEND_URL: string = getEnvVar('BACKEND_URL') || ''
export const BASE_URL: string = getDebuggerURL(3000) || BACKEND_URL || WEBDOMAIN || ''

/* --- fetchAetherProps() ---------------------------------------------------------------------- */

export const fetchAetherProps = async (query: string, fetcherOptions: AetherFetcherOptions) => {
  const { variables, headers, baseUrl = BASE_URL } = fetcherOptions
  const { data } = await axios.post(`${baseUrl}/api/graphql`, { query, variables }, { headers })
  return data
}
