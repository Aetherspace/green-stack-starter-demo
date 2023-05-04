import React from 'react'
import { AetherPage } from 'aetherspace/navigation'
// Screens
import * as homeScreen from 'app/screens/HomeScreen'

/* --- / --------------------------------------------------------------------------------------- */

const PageScreen = (
  props: homeScreen.HomeScreenProps & { searchParams: Record<string, unknown> }
) => {
  return (
    <AetherPage {...props} screen={homeScreen.HomeScreen} screenConfig={homeScreen.screenConfig} />
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default PageScreen
