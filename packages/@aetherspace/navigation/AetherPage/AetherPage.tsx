/* --- Types ----------------------------------------------------------------------------------- */

type AetherPageProps = {
  params?: Record<string, any>
  screen: React.FC<Record<string, any>>
  screenConfig: any
}

/* --- <AetherPage/> --------------------------------------------------------------------------- */

export const AetherPage = (props: AetherPageProps) => {
  // Props
  const { params, screen, screenConfig, ...restProps } = props

  // Screen
  const PageScreen = screen

  // -- Browser --

  return <PageScreen params={params} {...restProps} />
}
