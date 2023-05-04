import { getEnvList, getEnvVar, getGlobal } from 'aetherspace/utils/envUtils'
import axios from 'axios'
import { graphql } from 'graphql'

/* --- Constants ------------------------------------------------------------------------------- */

const APP_LINKS: string[] = getEnvVar('APP_LINKS')?.split('|') || []
const [WEBDOMAIN] = APP_LINKS.filter((link) => link.includes('http://') || link.includes('https://')) // prettier-ignore
export const BACKEND_URL: string = getEnvVar('BACKEND_URL') || ''
export const BASE_URL: string = BACKEND_URL || WEBDOMAIN || ''

/* --- fetchAetherProps() ---------------------------------------------------------------------- */

export const fetchAetherProps = async (query: string, variables: any, baseUrl = BASE_URL) => {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    try {
      const { schema } = await import('app/graphql/schema')
      const { data } = await graphql({ schema, source: query, variableValues: variables })
      return { data }
    } catch (error) {
      console.error('fetchAetherProps()', { error })
      return { data: {} }
    }
  } else {
    const isStorybook = getGlobal('IS_STORYBOOK') || false
    const APP_URLS = getEnvList('APP_LINKS').filter((url) => url.includes('http')) || []
    const BACKEND_URL = getEnvVar('BACKEND_URL') || getEnvVar('STORYBOOK_BACKEND_URL') || APP_URLS[0] // prettier-ignore
    const backendUrl = baseUrl || BACKEND_URL || (isStorybook ? 'http://localhost:3000' : '')
    const { data } = await axios.post(`${backendUrl}/api/graphql`, { query, variables })
    return data
  }
}
