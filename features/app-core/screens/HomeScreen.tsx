import React from 'react'
import { Image } from '../components/Image'
import { View, H3, P, TextLink } from '../components/styled'

/* --- <HomeScreen/> --------------------------------------------------------------------------- */

const HomeScreen = () => {
  return (
    <View className="flex flex-1 justify-center items-center">
      <Image src={require('../assets/aetherspaceLogo.png')} width={60} height={60} style={{ marginBottom: 12 }} />
      <H3 className="text-center">Expo + Next.js app routing 👋</H3>
      <P className="mt-2 text-center">Open HomeScreen.tsx in features/app-core/screens to start working on your app</P>
      <TextLink className="mt-4 text-center" href="/subpages/aetherspace">
        Test navigation
      </TextLink>
      <Link href="https://universal-base-starter-docs.vercel.app/" target="_blank" style={styles.link}>Docs</Link>
    </View>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeScreen
