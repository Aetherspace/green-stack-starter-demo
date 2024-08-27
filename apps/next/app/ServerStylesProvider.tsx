'use client'
/* eslint-disable @next/next/no-head-element */
import React from 'react'
import { StyleSheet } from 'react-native'
import { useServerInsertedHTML } from 'next/navigation'

// -i- This is a regular react client component
// -i- However, it is rendered on the server during SSR
// -i- Use this file to generate your SSR style elements to apply before hydration on web

/* --- <ServerStylesProvider> ------------------------------------------------------------------ */

const ServerStylesProvider = (props: { children: React.ReactNode }) => {
    // Props
    const { children } = props
  
    // -- Serverside Styles --
  
    useServerInsertedHTML(() => {
      // @ts-ignore
      const sheet = StyleSheet.getSheet()
      return (
        <style
          dangerouslySetInnerHTML={{ __html: sheet.textContent}}
          id={sheet.id}
        />
      )
    })
  
    // -- Render --
  
    return <>{children}</>
  }
  
  /* --- Exports --------------------------------------------------------------------------------- */
  
  export default ServerStylesProvider

