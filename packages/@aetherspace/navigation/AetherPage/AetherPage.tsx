/* --- Types ----------------------------------------------------------------------------------- */

type AetherPageProps = {
  PageScreen: React.FC<Record<string, any>>
  fetcher: (fetchKey?: string) => Promise<Record<string, any>>
  fetchKey: string
}

/* --- <AetherPage/> --------------------------------------------------------------------------- */

export const AetherPage = (props: AetherPageProps) => {
  // Props
  const { PageScreen } = props

  // -- Browser --

  return <PageScreen />
}
