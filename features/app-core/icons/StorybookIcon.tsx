import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { z, aetherSchema, AetherProps } from 'aetherspace/schemas'

/* --- Schema ---------------------------------------------------------------------------------- */

const StorybookIconProps = aetherSchema('StorybookIconProps', {
  width: z.number().default(24).describe('Icon width'),
  height: z.number().default(24).describe('Icon height'),
  fill: z.string().color().default('#ff4785').describe('Icon fill color'),
})

/* --- <StorybookIcon/> ------------------------------------------------------------------------ */

const StorybookIcon = (props: AetherProps<typeof StorybookIconProps>) => {
  // Props
  const svgProps = StorybookIconProps.parse(props)
  const { fill } = svgProps
  // Render
  return (
    <Svg viewBox="0 0 32 32" {...svgProps}>
      <Path
        d="m20.735 5.442.133-3.173 2.72-.168.122 3.23a.216.216 0 0 1-.047.143.21.21 0 0 1-.3.029l-1.05-.82-1.243.934a.212.212 0 0 1-.3-.04.206.206 0 0 1-.035-.135Z"
        fill="#fff"
      />
      <Path
        d="m20.868 2.268-.133 3.174a.206.206 0 0 0 .043.135.212.212 0 0 0 .3.04l1.243-.934 1.05.82a.21.21 0 0 0 .3-.029.216.216 0 0 0 .047-.143l-.13-3.231 1.566-.1a1.415 1.415 0 0 1 1.506 1.321v25.271A1.414 1.414 0 0 1 25.245 30h-.066l-18.948-.844A1.414 1.414 0 0 1 4.876 27.8L4 4.69a1.412 1.412 0 0 1 1.33-1.458l15.537-.963Z"
        fill={fill}
      />
      <Path
        d="M17.253 12.554c0 .547 3.72.285 4.22-.1 0-3.73-2.018-5.69-5.714-5.69s-5.766 1.99-5.766 4.976c0 5.2 7.077 5.3 7.077 8.136a1.127 1.127 0 0 1-1.258 1.27c-1.127 0-1.573-.572-1.52-2.512 0-.421-4.3-.553-4.43 0-.334 4.7 2.621 6.06 6 6.06 3.276 0 5.845-1.733 5.845-4.868 0-5.573-7.182-5.423-7.182-8.185a1.18 1.18 0 0 1 1.337-1.269c.526 0 1.47.092 1.391 2.182Z"
        fill="#fff"
      />
    </Svg>
  )
}

/* --- Documentation --------------------------------------------------------------------------- */

export const getDocumentationProps = StorybookIconProps.introspect()

/* --- Exports --------------------------------------------------------------------------------- */

export default StorybookIcon
