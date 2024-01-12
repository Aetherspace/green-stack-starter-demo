import React from 'react'
import { AetherPage } from 'aetherspace/navigation'
import * as AuthorScreen from 'app/screens/AuthorScreen'

/* --- Config ---------------------------------------------------------------------------------- */

const ScreenComponent = AuthorScreen.AuthorScreen
const screenConfig = AuthorScreen.screenConfig

/* --- /cv ------------------------------------------------------------------------------------- */

const PageScreen = (props: AuthorScreen.AuthorScreenProps) => (
  <AetherPage
    {...props}
    params={{ slug: 'codinsonn' }}
    screen={ScreenComponent}
    screenConfig={screenConfig}
    skipFetching
  />
)

/* --- Exports --------------------------------------------------------------------------------- */

export const dynamic = screenConfig.dynamic

export default PageScreen
