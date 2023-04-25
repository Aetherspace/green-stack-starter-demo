// Hooks
import { usePreferredURL } from '../hooks'
// Utils
import { getDebuggerURL, getEnvVar } from '../utils/envUtils'

/* --- useAPICheck --------------------------------------------------------------------------- */

const useAPICheck = (fallbackURLs: string[] = []) => {
  // Determine the API URL
  const healthEndpoint = usePreferredURL(
    [
      'http://localhost:3000/api/health',
      `${getDebuggerURL(3000)}/api/health`,
      ...fallbackURLs.map((url) => `${url}/api/health`),
    ],
    `${getEnvVar('BACKEND_URL') || getDebuggerURL(3000) || ''}/api/health`
  )
  // Determine the GraphQL endpoint
  const graphQLEndpoint = usePreferredURL(
    [
      'http://localhost:3000/api/graphql',
      `${getDebuggerURL(3000)}/api/graphql`,
      ...fallbackURLs.map((url) => `${url}/api/graphql`),
    ],
    `${getEnvVar('BACKEND_URL') || getDebuggerURL(3000) || ''}/api/graphql`
  )
  // Return the API URLs
  return {
    healthEndpoint,
    graphQLEndpoint,
  }
}

/* --- Exports --------------------------------------------------------------------------------- */

export { useAPICheck }
export default useAPICheck
