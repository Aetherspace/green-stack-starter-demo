import { ScrollView } from 'react-native'
// Types
import { AetherPageProps, AetherScreenConfig } from './AetherPage.types'

/* --- <AetherPage/> --------------------------------------------------------------------------- */

export const AetherPage = <SC extends AetherScreenConfig>(props: AetherPageProps<SC>) => {
  // Props
  const { params, screen, screenConfig, ...restProps } = props

  // Screen
  const PageScreen = screen

  // -- Browser --

  return (
    <ScrollView
      style={{ backgroundColor: screenConfig.backgroundColor || 'transparent' }}
      contentContainerStyle={{ width: '100%', minHeight: '100%' }}
    >
      <PageScreen params={params} {...restProps} />
    </ScrollView>
  )
}
