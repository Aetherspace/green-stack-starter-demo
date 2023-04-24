import { ScrollView } from 'react-native'

/* --- Types ----------------------------------------------------------------------------------- */

type AetherPageProps = {
  params?: Record<string, any>
  screen: React.FC<Record<string, any>> | ((props: any) => JSX.Element | null)
  screenConfig: any
}

/* --- <AetherPage/> --------------------------------------------------------------------------- */

export const AetherPage = (props: AetherPageProps) => {
  // Props
  const { params, screen, screenConfig, ...restProps } = props

  // Screen
  const PageScreen = screen

  // -- Browser --

  return (
    <ScrollView contentContainerStyle={{ width: '100%', minHeight: '100%' }}>
      <PageScreen params={params} {...restProps} />
    </ScrollView>
  )
}
