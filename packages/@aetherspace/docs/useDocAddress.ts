// Hooks
import { usePrefferredURL } from '../hooks'
// Utils
import { getDebuggerURL, getEnvVar } from '../utils/envUtils'

/* --- Types & constants ----------------------------------------------------------------------- */

enum DOC_SOURCES {
  localDocs = 'http://localhost:6006/',
  officialDocs = 'https://main--62c9a236ee16e6611d719e94.chromatic.com/',
}

/* --- useDocAddress() ---------------------------------------------------------------------------- */

const useDocAddress = (...preferredDocURIs: string[]) => {
  const docsURI = usePrefferredURL([
    // Any doc urls the dev would prefer
    ...preferredDocURIs,
    // Env var based documentation
    getEnvVar('DOCS_URI'),
    // Local storybook urls
    DOC_SOURCES.localDocs,
    getDebuggerURL(6006),
    // Official docs
    DOC_SOURCES.officialDocs,
  ])
  return docsURI
}

/* --- Exports --------------------------------------------------------------------------------- */

export { useDocAddress }
export default useDocAddress
