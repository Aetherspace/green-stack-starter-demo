'use client'
import React from 'react'
import ErrorBoundary from '../screens/ErrorBoundary'
import { View } from 'aetherspace/primitives'

/* --- <RootLayout/> --------------------------------------------------------------------------- */

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary>
    <View tw="flex flex-col min-h-full w-full bg-white">{children}</View>
  </ErrorBoundary>
)

/* --- Exports --------------------------------------------------------------------------------- */

export default RootLayout
