import { useState } from 'react'
import { View, Text, H3, Link } from '../components/styled'
import BackButton from '../components/BackButton'
import { TextInput } from '../forms/TextInput.styled'
import { Checkbox } from '../forms/Checkbox.styled'
import { useFormState } from '@green-stack/forms/useFormState'
import { z, schema } from '@green-stack/schemas'
import { useRouteParams, useRouter } from '@green-stack/navigation'

/* --- Schema --------------------------------------------------------------------------------- */

const TestForm = schema('TestForm', {
  email: z.string().email().default(''),
  age: z.number().optional(),
})

type TestForm = z.input<typeof TestForm>

/* --- <FormsScreen/> ------------------------------------------------------------------------- */

const FormsScreen = (props: TestForm) => {
  // Nav
  const { setParams } = useRouter()
  const params = useRouteParams(props)

  // State
  const [validateOnChange, setValidateOnChange] = useState(!!params.validateOnChange)

  // Forms
  const formState = useFormState(TestForm, {
    // @ts-ignore
    initialValues: { ...props, ...params },
    validateOnChange,
  })

  // -- Handlers --

  const submitForm = () => {
    // Convert values to strings
    const stringValues = Object.entries(formState.values).reduce((acc, [key, value]) => {
      // Ignore empty values?
      return !value ? acc : { ...acc, [key]: `${value}` }
    }, {} as Record<string, string>)
    // Update route params
    setParams(stringValues)
  }

  // -- Render --

  return (
    <View className="flex flex-1 justify-center items-center">
      <BackButton backLink="/subpages/Universal%20Nav" color="#333333" />
      <View className="flex flex-col w-full max-w-[500px] px-8">

        <TextInput
          placeholder="email..."
          placeholderTextColor={'#999999'}
          {...formState.getTextInputProps('email')}
        />

        <View className="h-4" />

        <TextInput
          placeholder="age..."
          placeholderTextColor={'#999999'}
          inputMode="numeric"
          {...formState.getNumberTextInputProps('age')}
        />

        <View className="h-4" />

        <Checkbox
          label="Validate on change"
          checked={validateOnChange}
          onCheckedChange={setValidateOnChange}
        />

        <View className="h-1 w-12 my-6 bg-slate-300" />

        <H3 className="text-black">
          <Link
            className="text-black no-underline"
            href="https://universal-base-starter-docs.vercel.app/quickstart"
            target="_blank"
          >
            {`📚 formState = useFormState( zod )`}
          </Link>
        </H3>

        <View className="h-4" />

        <Text className="text-start text-muted">
          {JSON.stringify(formState, null, 2)}
        </Text>

      </View>
    </View>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default FormsScreen
