import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text, H1, H2, H3, Link, ScrollView } from '../components/styled'
import BackButton from '../components/BackButton'
import { TextInput } from '../forms/TextInput.styled'
import { Checkbox } from '../forms/Checkbox.styled'
import { useFormState } from '@green-stack/forms/useFormState'
import { z, schema } from '@green-stack/schemas'
import { useRouteParams, useRouter } from '@green-stack/navigation'
import { CheckList } from '../forms/CheckList.styled'
import { RadioGroup } from '../forms/RadioGroup.styled'
import { Select } from '../forms/Select.styled'
import { isEmpty } from '@green-stack/utils/commonUtils'

/* --- Schema --------------------------------------------------------------------------------- */

const TestForm = schema('TestForm', {
  email: z.string().email().optional(),
  age: z.number().min(1).max(130).optional(),
  identifiesWith: z.string().optional(),
  excitingFeatures: z.array(z.string()).default([]),
  minHourlyPrice: z.number().default(50),
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
    initialValues: { ...props, ...params },
    validateOnChange,
  })

  // -- Handlers --

  const submitForm = () => {
    setParams(formState.values)
  }

  // -- Effects --

  useEffect(() => {
    if (!validateOnChange && !isEmpty(formState.errors)) formState.updateErrors({})
  }, [validateOnChange])

  useEffect(() => {
    if (!formState.isDefaultState) submitForm()
  }, [formState.values])

  // -- Render --

  return (
    <>
      <StatusBar style="dark" />
      <ScrollView
        className="flex flex-1 min-h-screen bg-white"
        contentContainerClassName="min-h-screen"
      >
        <View className="flex flex-1 justify-center items-center pt-28 pb-16">
          <View className="flex flex-col w-full max-w-[500px] px-8">

            <H1>Forms Demo</H1>

            <View className="h-4" />

            {/* -- TextInput -- */}

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

            {/* -- Checkbox -- */}

            <Checkbox
              label="Validate on change?"
              checked={validateOnChange}
              onCheckedChange={setValidateOnChange}
            />

            <View className="h-1 w-12 my-6 bg-slate-300" />

            {/* -- Radiogroup -- */}

            <H2 className="text-black">
              What role describes you best?
            </H2>

            <View className="h-4" />

            <RadioGroup
              options={{
                'full-product-dev': 'Full-stack web or mobile dev',
                'freelance-app-dev': 'Freelance App Developer',
              }}
              {...formState.getInputProps('identifiesWith')}
            >
              <RadioGroup.Option value="startup-founder" label="Startup Founder" />
              <RadioGroup.Option value="indiehacker" label="Indie Hacker" />
              <RadioGroup.Option value="studio-lead" label="Studio Lead / CEO / Architect" />
            </RadioGroup>

            <View className="h-1 w-12 my-6 bg-slate-300" />

            {/* -- CheckList -- */}

            <H2 className="text-black">
              Which DX features excite you?
            </H2>

            <View className="h-4" />

            <CheckList
              options={{
                'universal-starter': 'A write-once workflow for Web, iOS & Android',
                'git-plugins': 'Git based plugin branches & PRs',
              }}
              {...formState.getInputProps('excitingFeatures')}
            >
              <CheckList.Option value="stack-freedom" label="Pick and choose my own Auth / DB / Mail / ..." />
              <CheckList.Option value="zod-query-toolkit" label="Auto typed API's + fetching (zod, react-query)" />
              <CheckList.Option value="generators-scripts" label="Scripts and Generators to save more time" />
              <CheckList.Option value="designed-for-copypaste" label="Portable structure designed for copy-paste" />
              <CheckList.Option value="universal-fs-routing" label="Universal fs based routing in Expo and Next.js" />
            </CheckList>

            <View className="h-1 w-12 my-6 bg-slate-300" />

            {/* -- Select -- */}

            <H2 className="text-black">
              How do you value your time?
            </H2>

            <View className="h-4" />

            <Select
              placeholder="Select hourly rate..."
              options={{
                '10': '10 - 20 per hour or less',
                '20': '20 - 50 per hour range',
              }}
              value={`${formState.values.minHourlyPrice || ''}`}
              onChange={(price) => formState.handleChange('minHourlyPrice', +price)}
            >
              <Select.Option value="50" label="50 - 75 per hour" />
              <Select.Option value="75" label="75 - 100 per hour" />
              <Select.Option value="100" label="100+ per hour" />
            </Select>

            <View className="h-1 w-12 my-6 bg-slate-300" />

            {/* -- useFormstate -- */}

            <H3>
              <Link
                className="text-black no-underline"
                href="https://universal-base-starter-docs.vercel.app/quickstart"
                target="_blank"
              >
                {`formState = useFormState( zod )`}
              </Link>
            </H3>

            <View className="h-2" />

            <Link
              className="no-underline"
              href="https://universal-base-starter-docs.vercel.app/quickstart"
              target="_blank"
            >
              📗 Read the docs
            </Link>

            <View className="h-4" />

            <Text className="text-start text-muted">
              {JSON.stringify(formState, null, 2)}
            </Text>

          </View>
        </View>
      </ScrollView>
      <BackButton backLink="/subpages/Universal%20Nav" color="#333333" />
    </>
  )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default FormsScreen
