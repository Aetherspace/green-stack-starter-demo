import { useState, useEffect, useRef } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text, H1, H2, H3, Link, ScrollView, KeyboardAvoidingView } from '../components/styled'
import BackButton from '../components/BackButton'
import { TextInput } from '../forms/TextInput.styled'
import { NumberStepper } from '../forms/NumberStepper.styled'
import { Checkbox } from '../forms/Checkbox.styled'
import { useFormState } from '@green-stack/forms/useFormState'
import { z, schema, inputOptions } from '@green-stack/schemas'
import { useRouteParams, useRouter } from '@green-stack/navigation'
import { CheckList } from '../forms/CheckList.styled'
import { RadioGroup } from '../forms/RadioGroup.styled'
import { Select } from '../forms/Select.styled'
import { Switch } from '../forms/Switch.styled'
import { isEmpty } from '@green-stack/utils/commonUtils'
import { useScrollToFocusedInput } from '@green-stack/hooks/useScrollToFocusedInput'
import { TextArea } from '../forms/TextArea.styled'
import { Button } from '../components/Button'

/* --- Constants ------------------------------------------------------------------------------- */

const FEATURES = inputOptions({
    'universal-starter': 'A write-once workflow for Web, iOS & Android',
    'git-plugins': 'Git based plugin branches & PRs',
    'stack-freedom': 'Pick and choose my own Auth / DB / Mail plugin',
    'zod-query-toolkit': 'Auto typed API\'s + fetching (zod, react-query)',
    'generators-scripts': 'Scripts and Generators to save more time',
    'designed-for-copypaste': 'Portable structure designed for copy-paste',
    'universal-fs-routing': 'Universal fs based routing in Expo and Next.js',
})

const IDENTITIES = inputOptions({
    'full-product-dev': 'Full-stack web or mobile dev',
    'freelance-app-dev': 'Freelance App Developer',
    'startup-founder': 'Startup Founder',
    'indiehacker': 'Indie Hacker',
    'studio-lead': 'Studio Lead / CEO / Architect',
})

/* --- Schema --------------------------------------------------------------------------------- */

const TestForm = schema('TestForm', {
    email: z.string().email().optional(),
    age: z.number().min(1).max(130).optional(),
    identifiesWith: IDENTITIES.optional(),
    excitingFeatures: z.array(FEATURES).default([]),
    feedbackSuggestions: z.string().optional(),
    platformsTargeted: z.number().optional(),
    // -- Form Settings --
    showFormState: z.boolean().default(false),
    showResults: z.boolean().default(false),
    // -- Precalculated --
    setupHoursSaved: z.number().default(0),
    projectsPerYear: z.number().default(0),
    minHourlyPrice: z.number().default(50),
})

type TestForm = z.input<typeof TestForm>

/* --- Components ------------------------------------------------------------------------------ */

const CustomRadioGroup = RadioGroup.create<TestForm['identifiesWith']>()

/* --- <FormsScreen/> ------------------------------------------------------------------------- */

const FormsScreen = (props: TestForm) => {
    // Nav
    const { setParams } = useRouter()
    const params = useRouteParams(props)

    // Refs
    const emailInputRef = useRef<any$Ignore>(null)
    const ageInputRef = useRef<any$Ignore>(null)
    const feedbackInputRef = useRef<any$Ignore>(null)

    // Hooks
    const inputScrollUtils = useScrollToFocusedInput()

    // State
    const [validateOnChange, setValidateOnChange] = useState(!!params.validateOnChange)

    // Forms
    const formState = useFormState(TestForm, {
        initialValues: { ...props, ...params },
        validateOnChange,
    })

    // Vars
    const { showFormState, showResults } = formState.values

    // -- Handlers --

    const submitForm = () => {
        formState.handleChange('showResults', !showResults)
    }

    // -- Effects --

    useEffect(() => {
        if (!validateOnChange && !isEmpty(formState.errors)) formState.updateErrors({})
    }, [validateOnChange])

    // ⬇ Update url params when form values change

    useEffect(() => {
        if (!formState.isDefaultState) setParams(formState.values)
    }, [formState.values])

    // ⬇ Update projectsPerYear based on identifiesWith

    useEffect(() => {
        switch (formState.values.identifiesWith) {
            case 'full-product-dev': formState.handleChange('projectsPerYear', 6); break
            case 'freelance-app-dev': formState.handleChange('projectsPerYear', 3); break
            case 'startup-founder': formState.handleChange('projectsPerYear', 2); break
            case 'indiehacker': formState.handleChange('projectsPerYear', 4); break
            case 'studio-lead': formState.handleChange('projectsPerYear', 8); break
        }
    }, [formState.values.identifiesWith])

    // -- Render --

    return (
        <KeyboardAvoidingView {...inputScrollUtils.avoidingViewProps}>
            <StatusBar style="dark" />
            <ScrollView
                {...inputScrollUtils.scrollViewProps}
                className="flex flex-1 min-h-screen bg-white"
                contentContainerClassName="min-h-screen"
            >
                <View className="flex flex-1 justify-center items-center pt-28 pb-16">
                    <View className="flex flex-col w-full max-w-[500px] px-8">

                        <H1>Forms Demo</H1>

                        <View className="h-4" />

                        {/* -- TextInput -- */}

                        <TextInput
                            placeholder="e.g. thorr@fullproduct.dev"
                            {...formState.getTextInputProps('email')}
                            {...inputScrollUtils.registerInput(emailInputRef)}
                        />

                        <Text className="text-sm text-secondary mt-2">
                            Your email
                        </Text>

                        <View className="h-4" />

                        {/* -- Stepper -- */}

                        <NumberStepper
                            placeholder="e.g. 32"
                            min={18}
                            max={150}
                            step={1}
                            {...formState.getInputProps('age')}
                            {...inputScrollUtils.registerInput(ageInputRef)}
                        />

                        <Text className="text-sm text-secondary mt-2">
                            Your age
                        </Text>

                        <View className="h-6" />

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

                        <CustomRadioGroup
                            options={{
                                'full-product-dev': IDENTITIES.entries['full-product-dev'],
                                'freelance-app-dev': IDENTITIES.entries['freelance-app-dev'],
                            }}
                            {...formState.getInputProps('identifiesWith')}
                        >
                            <RadioGroup.Option value="startup-founder" label="Startup Founder" />
                            <RadioGroup.Option value="indiehacker" label="Indie Hacker" />
                            <RadioGroup.Option value="studio-lead" label="Studio Lead / CEO / Architect" />
                        </CustomRadioGroup>

                        <View className="h-1 w-12 my-6 bg-slate-300" />

                        {/* -- Select -- */}

                        <H2 className="text-black">
                            What platforms do you typically ship?
                        </H2>

                        <View className="h-4" />

                        <Select
                            placeholder="Select devices and targets"
                            options={{ '1': 'Web only 👉 Static / SSR + Hydration' }}
                            value={`${formState.values.platformsTargeted || ''}`}
                            onChange={(targets) => formState.handleChange('platformsTargeted', +targets)}
                        >
                            <Select.Option value="2" label="Mobile 📲 iOS + Android" />
                            <Select.Option value="3" label="Universal 🚀 Web + Mobile" />
                        </Select>

                        <View className="h-1 w-12 my-6 bg-slate-300" />

                        {/* -- CheckList -- */}

                        <H2 className="text-black">
                            Which DX features excite you?
                        </H2>

                        <View className="h-4" />
                        
                        <CheckList
                            options={FEATURES.entries}
                            {...formState.getInputProps('excitingFeatures')}
                        />

                        <View className="h-1 w-12 my-6 bg-slate-300" />

                        {/* -- TextArea -- */}

                        <H2 className="text-black">
                            What's missing?
                        </H2>

                        <View className="h-4" />

                        <TextArea
                            placeholder="How could we further improve your workflow?"
                            {...formState.getTextInputProps('feedbackSuggestions')}
                            {...inputScrollUtils.registerInput(feedbackInputRef)}
                        />

                        <Text className="text-sm text-secondary mt-2">
                            Feedback or suggestions appreciated
                        </Text>

                        <View className="h-1 w-12 my-6 bg-slate-300" />

                        {/* -- Button -- */}

                        <View className="flex-row">
                            <Button
                                text={showResults ? 'Hide Results' : 'Submit & Show Results'}
                                iconRight={showResults ? 'ChevronUpFilled' : 'ArrowRightFilled'}
                                type={showResults ? 'outline' : 'primary'}
                                size="md"
                                onPress={submitForm}
                                disabled={!formState.isValid}
                                fullWidth
                            />
                        </View>

                        {/* -- Results -- */}

                        {showResults && (
                            <>
                                <View className="h-10" />

                                <H2 className="text-primary text-5xl">
                                    Results
                                </H2>

                                <View className="h-2" />

                                
                            </>
                        )}

                        {/* -- Switch -- */}

                        <View className="h-1 w-12 my-6 bg-slate-300" />
                        
                        <Switch
                            label="Show formState"
                            checked={showFormState}
                            onCheckedChange={() => formState.handleChange('showFormState', !showFormState)}
                        />

                        {/* -- useFormstate() -- */}

                        {showFormState && (
                            <>
                                <View className="h-4" />

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

                                <Text className="text-start">
                                    {JSON.stringify(formState, null, 2)}
                                </Text>
                            </>
                        )}

                        {inputScrollUtils.keyboardPaddedView}

                    </View>
                </View>

            </ScrollView>
            <BackButton backLink="/subpages/Universal%20Nav" color="#333333" />
        </KeyboardAvoidingView>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default FormsScreen
