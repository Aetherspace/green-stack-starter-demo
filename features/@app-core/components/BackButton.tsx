import React from 'react'
import { View, Text, Link, Pressable } from '../components/styled'
import { useRouter } from '@green-stack/navigation/useRouter'
import { ArrowLeftFilled } from '../icons/ArrowLeftFilled'
import { schema, z } from '@green-stack/schemas'

/* --- Props ----------------------------------------------------------------------------------- */

const BackButtonProps = schema('BackButtonProps', {
  color: z.string().default('#FFFFFF'),
  iconSize: z.number().default(24),
  backText: z.string().optional().example('Back'),
  backLink: z.string().default('/'),
})

type BackButtonProps = z.input<typeof BackButtonProps>

/* --- <BackButton/> --------------------------------------------------------------------------- */

const BackButton = (props: BackButtonProps) => {
  // Props
  const { color, iconSize, backText, backLink } = BackButtonProps.applyDefaults(props)

  // Routing
  const { canGoBack, back } = useRouter()

  // Vars
  const showBackButton = canGoBack()

  // -- Prerender --

  const innerBackButton = (
    <View className="flex flex-row p-4 items-center">
      <ArrowLeftFilled fill={color} size={iconSize} />
      {!!backText && (
        <>
          <View className="w-[5px]" />
          <Text
            className={`text-xl text-[${color}]`}
            style={{ color }}
          >
            {`Back`}
          </Text>
        </>
      )}
    </View>
  )

  // -- Render --

  return showBackButton ? (
    <Pressable
        className={`absolute top-8 web:top-0 left-0`} // @ts-ignore
        onPress={back}
      >
        {innerBackButton}
      </Pressable>
  ) : (
    <Link
      className={`absolute top-8 web:top-0 left-0 text-[${color}] no-underline`}
      href={backLink}
    >
      {innerBackButton}
    </Link>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default BackButton