import React from 'react'
import { View, Image, H3, P, Link } from '../components/styled'

/* --- <HomeScreen/> --------------------------------------------------------------------------- */

const HomeScreen = () => {
  return (
    <View className="flex flex-1 justify-center items-center">
      <Image src={require('../assets/aetherspaceLogo.png')} width={60} height={60} className="mb-3" />
      <H3 className="text-center">Expo + Next.js app routing 🚀</H3>
      <P className="mt-2 text-center">Open HomeScreen.tsx in features/app-core/screens to start working on your app</P>
      <Link className="mt-4 text-center" href="/subpages/aetherspace">
        Test navigation
      </Link>
      <Link className="mt-4 text-center" href="/images">
        Test images
      </Link>
      <Link className="mt-4 text-center" href="https://universal-base-starter-docs.vercel.app/" target="_blank">
        Docs
      </Link>
    </View>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeScreen
