import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useRouteParams } from '../navigation/useRouteParams'
import { Link } from '../navigation/Link'
import { useRouter } from '../navigation/useRouter'

/* --- <SlugScreen/> --------------------------------------------------------------------------- */

const SlugScreen = (props) => {
  // Routing
  const { slug, count = '' } = useRouteParams(props)
  const { canGoBack, back, push, navigate, replace, setParams } = useRouter()

  // Vars
  const showBackButton = canGoBack()

  // -- Render --

  return (
    <View style={styles.container}>
      {showBackButton && (
        <Text
          style={{ ...styles.backButton, ...styles.link, textDecorationLine: 'none' }}
          onPress={back}
        >
          {`< Back`}
        </Text>
      )}
      <Text style={styles.title}>
        Page slug: {slug}
        {!!count && ` | count: ${count}`}
      </Text>
      <Text style={styles.subtitle}>Need a more robust, Fully-Stacked, Full-Product, Universal App Setup?</Text>
      <Link href="https://github.com/Aetherspace/green-stack-starter-demo#readme" target="_blank" style={styles.link}>
        Check out the GREEN Stack Starter
      </Link>
      <Text style={styles.link} onPress={() => push('/subpages/push')}>
        {`router.push()`}
      </Text>
      <Text style={styles.link} onPress={() => navigate('/subpages/navigate')}>
        {`router.navigate()`}
      </Text>
      <Text style={styles.link} onPress={() => replace('/subpages/replace')}>
        {`router.replace()`}
      </Text>
      <Text style={styles.link} onPress={() => setParams({ count: `${+count + 1}` })}>
        {`router.setParams()`}
      </Text>
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
