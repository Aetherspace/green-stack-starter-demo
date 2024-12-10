import { useState, useEffect, useRef, ComponentProps, MutableRefObject } from 'react'
import { Platform, Keyboard, TextInput, KeyboardAvoidingView } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

/* --- useScrollToFocusedInput() --------------------------------------------------------------- */

export const useScrollToFocusedInput = () => {
  // Refs
  const scrollViewRef = useRef<any$Ignore>(null)
  const scrollYRef = useRef(0)
  const focusedInputY = useRef(0)
  
  // State
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(Keyboard.isVisible())
  
  // Vars
  type KeyboardBehaviour = ComponentProps<typeof KeyboardAvoidingView>['behavior']
  const keyboardBehaviour = Platform.OS === 'ios' ? 'padding' : 'height'
  const keyboardPadding = Platform.OS === 'ios' ? 300 : 250
  const scrollY = scrollYRef.current
  
  // -- Keyboard Management --

  useEffect(() => {

    const keyboardDidShow = () => setIsKeyboardVisible(true)
    const keyboardDidHide = () => {
      setIsKeyboardVisible(false)
      focusedInputY.current = 0
    }

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo?.({
        x: 0,
        y: focusedInputY.current || scrollYRef.current,
        animated: true,
      })
    }, 100)
  }, [isKeyboardVisible])

  // -- Scroll Management --

  const handleScroll = (e: any$Ignore) => (scrollYRef.current = e.nativeEvent.contentOffset.y)

  const handleFocusInput = (inputRef: MutableRefObject<TextInput | null>) => {
    return (nativeEvent: any$Ignore) => {
      inputRef?.current?.measure((_x, y, _w, h, _px, py) => {
        const focusY = scrollYRef.current + py // = Input position inside the ScrollView
        const shouldScroll = focusY > keyboardPadding
        const newInputY = focusY - keyboardPadding - h - 8
        focusedInputY.current = shouldScroll ? newInputY : 0
      })
    }
  }

  // -- Target Management --

  const registerInput = (inputRef: MutableRefObject<any$Ignore>) => {
    return {
      ref: inputRef,
      onFocus: handleFocusInput(inputRef),
    }
  }

  // -- Prerender --

  const height = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(height.get(), { duration: 90 }),
  }), [height.get()])

  useEffect(() => {
    height.set(isKeyboardVisible ? keyboardPadding : 0)
  }, [isKeyboardVisible])

  const keyboardPaddedView = Platform.OS !== 'web' ? (
    <Animated.View
      style={[
        {
          position: 'relative',
          width: '100%',
          height: 0,
        },
        animatedStyle,
      ]}
    />
  ) : null

  // -- Return --

  return {
    scrollViewRef,
    scrollPosition: scrollY,
    handleScroll,
    handleFocusInput,
    keyboardBehaviour,
    keyboardPadding,
    keyboardPaddedView,
    isKeyboardVisible,
    avoidingViewProps: {
      behavior: keyboardBehaviour as KeyboardBehaviour,
      style: { flex: 1 },
      enabled: true,
    },
    scrollViewProps: {
      ref: scrollViewRef,
      scrollEventThrottle: 16,
      onScroll: handleScroll,
    },
    registerInput,
  }
}
