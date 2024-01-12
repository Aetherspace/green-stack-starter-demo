import React from 'react'
import { AetherPage } from 'aetherspace/navigation'
import * as homeScreen from 'app/screens/HomeScreen'

/* --- / --------------------------------------------------------------------------------------- */

const PageScreen = (props: homeScreen.HomeScreenProps) => (
  <AetherPage {...props} screen={homeScreen.HomeScreen} screenConfig={homeScreen.screenConfig} />
)

/* --- Exports --------------------------------------------------------------------------------- */

export const dynamic = homeScreen.screenConfig.dynamic

export default PageScreen
