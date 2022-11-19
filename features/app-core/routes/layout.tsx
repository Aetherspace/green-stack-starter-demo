import React from 'react'
import { View } from 'aetherspace/primitives'

/* --- <RootLayout/> --------------------------------------------------------------------------- */

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <View tw="flex min-h-full min-w-full">{children}</View>
}

/* --- Exports --------------------------------------------------------------------------------- */

export default RootLayout
