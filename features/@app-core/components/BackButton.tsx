import React from 'react'
import { View, Text, Link } from '../components/styled'
import { useRouter } from '@green-stack/navigation/useRouter'
import { ArrowLeftFilled } from '../icons/ArrowLeftFilled'
import { schema, z } from '@green-stack/schemas'

/* --- Props ----------------------------------------------------------------------------------- */

const BackButtonProps = schema('BackButtonProps', {
  backLink: z.string().default('/'),
})

type BackButtonProps = z.input<typeof BackButtonProps>

/* --- <BackButton/> --------------------------------------------------------------------------- */

const BackButton = (props: BackButtonProps) => {
  // Props
  const { backLink } = BackButtonProps.applyDefaults(props)

  // Routing
  const { canGoBack, back } = useRouter()

  // Vars
  const showBackButton = canGoBack()

  // -- Render --

  return (
    <View className="flex flex-row absolute top-8 web:top-0 left-0 p-4 items-center">
      <ArrowLeftFilled fill="#FFFFFF" size={18} />
      <View className="w-[5px]" />
      {showBackButton ? (
        <Text
          className="text-white text-lg"
          onPress={back}
        >
          {`Back`}
        </Text>
      ) : (
        <Link href={backLink} className="text-white text-lg no-underline">
          {`Back`}
        </Link>
      )}
    </View>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default BackButton
