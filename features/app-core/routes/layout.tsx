'use client'
import React from 'react'
// Screens
import ErrorBoundary from '../screens/ErrorBoundary'
// Primitives
import { View } from 'aetherspace/primitives'

/* --- <RootLayout/> --------------------------------------------------------------------------- */

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary>
    <View tw="flex flex-col min-h-full w-full bg-white">{children}</View>
  </ErrorBoundary>
)

/* --- Exports --------------------------------------------------------------------------------- */

export default RootLayout
