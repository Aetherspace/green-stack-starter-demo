import { getEnvVar } from 'aetherspace/utils/envUtils'
import axios from 'axios'
import { graphql } from 'graphql'

/* --- Constants ------------------------------------------------------------------------------- */

const APP_LINKS: string[] = getEnvVar('APP_LINKS')?.split('|') || []
const [WEBDOMAIN] = APP_LINKS.filter((link) => link.includes('://'))
const BACKEND_URL: string = getEnvVar('BACKEND_URL') || ''
const BASE_URL: string = BACKEND_URL || WEBDOMAIN || ''

/* --- fetchAetherProps() ---------------------------------------------------------------------- */

export const fetchAetherProps = async (query: string, variables: any, baseUrl = BASE_URL) => {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    const { schema } = await import('app/graphql/schema')
    const { data } = await graphql({ schema, source: query, variableValues: variables })
    return { data }
  } else {
    const { data } = await axios.post(`${baseUrl}/api/graphql`, { query, variables })
    return data
  }
}
