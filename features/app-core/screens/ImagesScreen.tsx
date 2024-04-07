import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Link } from '../navigation/Link'
import { Image } from '../components/Image'

/* --- <ImagesScreen/> --------------------------------------------------------------------------- */

const ImagesScreen = () => {
  return (
    <View style={styles.container}>
      <Link
        href="/"
        style={{ ...styles.backButton, ...styles.link, textDecorationLine: 'none' }}
      >
        {`< Back`}
      </Link>
      {/* - 1 - */}
      <Image src={require('../assets/aetherspaceLogo.png')} width={60} height={60} />
      <Text style={styles.subtitle}>src=static-require | width: 60 | height: 60</Text>
      {/* - 2 - */}
      <Image src="https://codinsonn.dev/_next/image?url=%2Fimg%2FCodelyFansLogoPic160x160.jpeg&w=256&q=75" width={60} height={60} />
      <Text style={styles.subtitle}>src=external-url | width: 60 | height: 60</Text>
      {/* - 3 - */}
      <View style={{ width: 60, height: 80, position: 'relative', borderColor: 'black', borderStyle: 'dashed', borderWidth: 1 }}>
        <Image src={require('../assets/aetherspaceLogo.png')} fill />
      </View>
      <Text style={styles.subtitle}>wrapper=50x80, relative | fill=true</Text>
      {/* - 4 - */}
      <View style={{ width: 80, height: 60, position: 'relative', borderColor: 'black', borderStyle: 'dashed', borderWidth: 1 }}>
        <Image src={require('../assets/aetherspaceLogo.png')} fill contentFit="contain" />
      </View>
      <Text style={styles.subtitle}>wrapper=80x60, relative | fill | contentFit=contain</Text>
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
  subtitle: {
    marginTop: 8,
    marginBottom: 16,
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

export default ImagesScreen
