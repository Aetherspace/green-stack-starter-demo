import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Link } from '../navigation/Link'
import { Image } from '../components/Image'
import { H3, P } from '../components/Typography'

/* --- <HomeScreen/> --------------------------------------------------------------------------- */

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image src={require('../assets/aetherspaceLogo.png')} width={60} height={60} style={{ marginBottom: 12 }} />
      <H3 className="text-center">Expo + Next.js app routing 🚀</H3>
      <P className="mt-8 text-center">Open HomeScreen.tsx in features/app-core/screens to start working on your app</P>
      <Link href="/subpages/aetherspace" style={styles.link}>Test navigation</Link>
      <Link href="/images" style={styles.link}>Test images</Link>
      <Link href="https://universal-base-starter-docs.vercel.app/" target="_blank" style={styles.link}>Docs</Link>
    </View>
  )
}

/* --- Styles ---------------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  link: {
    marginTop: 16,
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
})

/* --- Exports --------------------------------------------------------------------------------- */

export default HomeScreen
