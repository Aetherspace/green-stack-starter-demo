import 'esbuild-register/dist/node' // @ts-ignore
import { addAliases } from 'module-alias'

/* --- Aliases --------------------------------------------------------------------------------- */

addAliases({
  // -i- We need aliases for these as they touch parts of react-native that ship Flow types
  // -i- ...which typescript can't deal with.
  'expo-constants': './__mocks__/expo-constants.mock.ts',
  'react-native': 'react-native-web'
})
