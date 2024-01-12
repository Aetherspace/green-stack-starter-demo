export type AetherFetcherOptions<AT = any> = {
  variables?: AT
  headers?: Record<string, string>
  baseUrl?: string
}
