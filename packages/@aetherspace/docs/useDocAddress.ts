// Hooks
import { usePreferredURL } from '../hooks'
// Utils
import { getDebuggerURL, getEnvVar } from '../utils/envUtils'

/* --- Types & constants ----------------------------------------------------------------------- */

enum DOC_SOURCES {
  localDocs = 'http://localhost:6006/',
  officialDocs = 'https://main--62c9a236ee16e6611d719e94.chromatic.com/',
}

/* --- useDocAddress() ---------------------------------------------------------------------------- */

const useDocAddress = (...preferredDocURIs: string[]) => {
  const urlsToCheck = [
    // Any doc urls the dev would prefer
    ...preferredDocURIs,
    // Env var based documentation
    getEnvVar('DOCS_URI'),
    // Local storybook urls
    DOC_SOURCES.localDocs,
    getDebuggerURL(6006),
    // Official docs
    DOC_SOURCES.officialDocs,
  ]
  const docsURI = usePreferredURL(urlsToCheck)
  return docsURI || DOC_SOURCES.officialDocs
}

/* --- Exports --------------------------------------------------------------------------------- */

export { useDocAddress }
export default useDocAddress
