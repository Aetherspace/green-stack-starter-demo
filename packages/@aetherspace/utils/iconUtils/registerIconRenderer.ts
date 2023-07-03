/** --- registerIconRenderer() ----------------------------------------------------------------- */
/** -i- Register a list of icons to be rendered through a third party icon renderer, for later use in AetherIcon */
export const registerIconRenderer = <
  K extends readonly string[],
  R extends (props: {
    name: K[number]
    size: number
    fill: string
    [key: string]: any
  }) => JSX.Element
>(
  iconKeys: K,
  renderer: R
) => {
  return iconKeys.reduce(
    (acc, key: K[number]) => ({
      ...acc,
      [key]: renderer,
    }),
    {}
  ) as Record<K[number], R>
}
