'use client'
import { useFonts } from 'expo-font'
import {
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from '@expo-google-fonts/roboto'

/* --- useLoadFonts() -------------------------------------------------------------------------- */

const useLoadFonts = () => {
  const fontsToLoad = {
    // - Google Fonts -
    Roboto: Roboto_400Regular,
    RobotoLight: Roboto_300Light,
    RobotoRegular: Roboto_400Regular,
    RobotoBold: Roboto_700Bold,
    RobotoBlack: Roboto_900Black,
    Roboto100: Roboto_100Thin,
    Roboto200: Roboto_300Light, // Fallback
    Roboto300: Roboto_300Light,
    Roboto400: Roboto_400Regular,
    Roboto500: Roboto_500Medium,
    Roboto600: Roboto_700Bold, // Fallback
    Roboto700: Roboto_700Bold,
    Roboto800: Roboto_900Black, // Fallback
    Roboto900: Roboto_900Black,
    // - Icon Fonts -
    // e.g. AntDesign: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/AntDesign.ttf'),
  }

  const [googleFontsLoaded, googleFontsError] = useFonts(fontsToLoad)

  if (googleFontsError) console.error('googleFontsError:', googleFontsError)

  // -- Return --

  return googleFontsLoaded
}

/* --- Exports --------------------------------------------------------------------------------- */

export default useLoadFonts
