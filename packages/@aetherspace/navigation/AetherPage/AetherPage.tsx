import { useRef, useEffect } from 'react'
import { SWRConfig } from 'swr'
import { ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { AetherPageProps, AetherScreenConfig } from './AetherPage.types'
import { swrMiddlewareRegistry } from 'registries/swrMiddleware'

/* --- <AetherPage/> --------------------------------------------------------------------------- */

export const AetherPage = <SC extends AetherScreenConfig>(props: AetherPageProps<SC>) => {
  // Props
  const { params, screen, screenConfig, skipFetching, ...restProps } = props

  // Refs
  const scrollViewRef = useRef<ScrollView>(null)
  const scrollYRef = useRef(0)

  // Screen
  const PageScreen = screen

  // -- Keyboard Management --

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ x: 0, y: scrollYRef.current + 8, animated: true })
      }, 300)
    })

    return () => {
      keyboardDidShowListener.remove()
    }
  }, [])

  // -- Handlers --

  const handleScroll = (e: any) => (scrollYRef.current = e.nativeEvent.contentOffset.y)

  // -- Browser --

  return (
    <SWRConfig value={{ use: swrMiddlewareRegistry }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, backgroundColor: screenConfig.backgroundColor || 'transparent' }}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ width: '100%', minHeight: '100%' }}
          scrollEventThrottle={16}
          onScroll={handleScroll}
        >
          <PageScreen params={params} {...restProps} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SWRConfig>
  )
}
