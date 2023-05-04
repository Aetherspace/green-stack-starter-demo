/* --- Types ----------------------------------------------------------------------------------- */

export type AetherScreenConfig = {
  query: string
  getGraphqlVars: (params?: Record<string, unknown>) => Record<string, unknown>
  getGraphqlData: (
    queryKey: string,
    queryVariables?: Record<string, unknown>
  ) => Promise<Record<string, unknown>>
  paramSchema: unknown
  propSchema: unknown
  refetchOnMount?: boolean
  backgroundColor?: string
}

export type AetherPageProps<SC extends AetherScreenConfig> = {
  params?: Record<string, any>
  searchParams?: Record<string, any>
  screen: React.FC<Record<string, any>> | ((props: any) => JSX.Element | null)
  screenConfig: SC
}
