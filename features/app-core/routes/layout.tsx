import React from 'react'
// Primitives
import { View } from 'aetherspace/primitives'

/* --- <RootLayout/> --------------------------------------------------------------------------- */

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <View tw="flex flex-col min-h-full min-w-full bg-white">{children}</View>
)

/* --- Exports --------------------------------------------------------------------------------- */

export default RootLayout
