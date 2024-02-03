import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useUniversalRouteParams } from '@app/core/hooks/useUniversalRouteParams'
import { Link } from '../components/Link'

/* --- <SlugScreen/> --------------------------------------------------------------------------- */

const SlugScreen = (props) => {
  const { slug } = useUniversalRouteParams(props)
  return (
    <View style={styles.container}>
      <Link href="/" style={{ ...styles.backButton, ...styles.link, textDecorationLine: 'none' }}>
        {`< Back`}
      </Link>
      <Text style={styles.title}>Page slug: {slug}</Text>
      <Text style={styles.subtitle}>Need a more robust, Fully-Stacked, Full-Product, Universal App Setup?</Text>
      <Link href="https://github.com/Aetherspace/green-stack-starter-demo#readme" target="_blank" style={styles.link}>
        Check out the GREEN Stack Starter
      </Link>
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
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
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

export default SlugScreen
