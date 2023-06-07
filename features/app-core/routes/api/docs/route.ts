import { redirect } from 'next/navigation'
// Utils
import { checkURLs, getEnvVar, getUrlParams } from 'aetherspace/utils/serverUtils'

/* --- Constants ------------------------------------------------------------------------------- */

const DOCS_URL = getEnvVar('DOCS_URL')

/* --- /api/docs ------------------------------------------------------------------------------- */

export const GET = async (req: Request) => {
  // Args
  const queryParams = getUrlParams(req.url)
  const preferredURL = queryParams?.preferredURL || ''
  // Check all possible documentation URLs
  const urlsToCheck = [
    preferredURL,
    'http://localhost:6006',
    DOCS_URL,
    'https://main--62c9a236ee16e6611d719e94.chromatic.com',
  ].filter(Boolean)
  const [docsURL] = await checkURLs(urlsToCheck)
  // Redirect to first available URL
  redirect(docsURL)
}
