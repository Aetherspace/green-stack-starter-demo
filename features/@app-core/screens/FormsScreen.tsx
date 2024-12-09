import { useState, useEffect, useRef } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import { cn, View, Text, H1, H2, H3, Link, ScrollView, KeyboardAvoidingView, getThemeColor } from '../components/styled'
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
import { removeSetItem } from '@green-stack/utils/arrayUtils'
import { roundDownTo, roundUpTo } from '@green-stack/utils/numberUtils'

/* --- Constants ------------------------------------------------------------------------------- */

const oneWeek = 24 * 7 // One week in hours

const FEATURES = inputOptions({
    'universal-starter': 'A write-once workflow for Web, iOS & Android',
    'git-plugins': 'Git based plugin branches & PRs',
    'stack-freedom': 'Pick and choose my own Auth / DB / Mail plugin',
    'zod-query-toolkit': 'Auto typed API\'s + fetching (zod, react-query)',
    'generators-scripts': 'Scripts and Generators to save more time',
    'designed-for-copypaste': 'Portable structure for copy-paste features',
    'universal-fs-routing': 'Universal fs based routing in Expo and Next.js',
} as const)

const IDENTITIES = inputOptions({
    'full-product-dev': 'Full-stack web or mobile dev',
    'freelance-app-dev': 'Freelance App Developer',
    'startup-founder': 'Startup Founder',
    'indiehacker': 'Indie Hacker',
    'studio-lead': 'Studio Lead / CEO / Architect',
} as const)

const TECH_KNOWLEDGE = inputOptions({
    'typescript': 'TypeScript',
    'react': 'React',
    'react-native': 'React Native',
    'expo': 'Expo',
    'nextjs': 'Next.js',
    'zod': 'Zod',
    'react-query': 'React Query',
} as const)

const PLUGINS = inputOptions({
    'auth': 'Authentication - Auth0 / Clerk / Custom ...',
    'db': 'Database - Prisma / Supabase / MongoDB ...',
    'mail': 'Mail - Resend / Sendgrid / Mailgun ...',
    'notifications': 'Notifications - OneSignal / Expo ...',
    'payments': 'Payments - Stripe / Lemonsqueezy ...',
    'storage': 'Storage - S3 / Cloudinary / Supabase ...',
})

/* --- Schema --------------------------------------------------------------------------------- */

const TestForm = schema('TestForm', {
    email: z.string().email().optional(),
    age: z.number().min(1).max(130).optional(),
    identifiesWith: IDENTITIES.optional(),
    excitingFeatures: z.array(FEATURES).default([]),
    pluginsToMerge: z.array(PLUGINS).default([]),
    feedbackSuggestions: z.string().optional(),
    platformsTargeted: z.number().optional(),
    // -- Form Settings --
    showFormState: z.boolean().default(false),
    showResults: z.boolean().default(false),
    // -- Precalculated --
    projectsPerYear: z.number().min(1).default(1),
    currentSetupHoursPerProject: z.number().default(oneWeek),
    knownTech: z.array(TECH_KNOWLEDGE).default(TECH_KNOWLEDGE.options),
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
    const { showFormState, showResults, excitingFeatures, platformsTargeted } = formState.values
    const { projectsPerYear, currentSetupHoursPerProject, pluginsToMerge, knownTech } = formState.values

    // Theme
    const scheme = useColorScheme()

    // -- Result Calculation --

    // Starting point = 1 week of setup on average by default (editable)
    let setupHoursPerProject = currentSetupHoursPerProject

    // ⬇ Calculate additional plugin hours saved based on plugins merged

    let pluginHoursSaved = 8 // Default to 1 day saved for other plugins
    if (pluginsToMerge.includes('auth')) pluginHoursSaved += 6 // Auth plugins
    if (pluginsToMerge.includes('db')) pluginHoursSaved += 5 // DB plugins
    if (pluginsToMerge.includes('mail')) pluginHoursSaved += 4 // Mail plugins
    if (pluginsToMerge.includes('notifications')) pluginHoursSaved += 4 // Notifications plugins
    if (pluginsToMerge.includes('payments')) pluginHoursSaved += 4 // Payments plugins
    if (pluginsToMerge.includes('storage')) pluginHoursSaved += 4 // Storage plugins

    // ⬇ Add additional hours saved per project based on exciting features

    if (excitingFeatures.includes('universal-starter')) setupHoursPerProject += oneWeek
    if (excitingFeatures.includes('git-plugins')) setupHoursPerProject += pluginHoursSaved // Additional time saved
    if (excitingFeatures.includes('stack-freedom')) setupHoursPerProject += 8 // No time spent removing unknonw tech
    if (excitingFeatures.includes('zod-query-toolkit')) setupHoursPerProject += 12 // Automating API typing and fetching
    if (excitingFeatures.includes('generators-scripts')) setupHoursPerProject += 8 // No more boilerplate code
    if (excitingFeatures.includes('designed-for-copypaste')) setupHoursPerProject += 16 // Copy paste features from earlier projects
    if (excitingFeatures.includes('universal-fs-routing')) setupHoursPerProject += 8 // Universal automated routing + deeplinks

    // ⬇ Figure out delivery efficiency based on platforms targeted

    let deliveryEfficiency = 1 // Default to Universal App Delivery
    if (platformsTargeted === 2) deliveryEfficiency = 1 + 0.75 // From Mobile = 75% more efficient
    if (platformsTargeted === 1) deliveryEfficiency = 1 + 1.5 // From Web = 150% more efficient
    
    setupHoursPerProject = setupHoursPerProject * deliveryEfficiency

    // ⬇ Subtract the learning gap hours based on known tech

    let learningGapHours = 3 // Learning the kit and way of working
    if (!knownTech.includes('typescript')) learningGapHours += 8 // TS basics
    if (!knownTech.includes('react')) learningGapHours += 8 * 2 // React basics
    if (!knownTech.includes('react-native')) learningGapHours += 8 // RN basics
    if (!knownTech.includes('expo')) learningGapHours += 8 // Expo basics
    if (!knownTech.includes('nextjs')) learningGapHours += 8 // Next.js basics
    if (!knownTech.includes('zod')) learningGapHours += 1 // Zod basics
    if (!knownTech.includes('react-query')) learningGapHours += 4 // React Query basics
    if (excitingFeatures.includes('git-plugins')) learningGapHours += 8 // Plugin PR Reviews

    // ⬇ Final result calculation

    const annualSetupHoursSaved = setupHoursPerProject * projectsPerYear
    const annualHoursSaved = roundDownTo(annualSetupHoursSaved - learningGapHours)

    const formatRelativeTime = (
        hoursSaved = annualHoursSaved,
        roundFn = roundDownTo,
        decimals = 0
    ) => {
        const daysSaved = roundFn(hoursSaved / 8, decimals)
        const weeksSaved = roundFn(daysSaved / 6, decimals) // Exclude sundays
        const monthsSaved = roundFn(weeksSaved / 4, decimals)
        if (monthsSaved > 1) return `${monthsSaved} month${monthsSaved > 1 ? 's' : ''}`
        if (weeksSaved > 1) return `${weeksSaved} week${weeksSaved > 1 ? 's' : ''}`
        if (daysSaved > 1) return `${daysSaved} day${daysSaved > 1 ? 's' : ''}`
        return `${hoursSaved} hour${hoursSaved > 1 ? 's' : ''}`
    }

    const currentEfficiencyMultiplier = !excitingFeatures.includes('universal-starter') ? 1 : deliveryEfficiency
    const currentEfficiencyRate = roundDownTo(Math.max(1, currentEfficiencyMultiplier - currentEfficiencyMultiplier / 10))
    
    const currentAnnualHours = currentSetupHoursPerProject * projectsPerYear / currentEfficiencyRate
    const annualEfficiencyRate = roundDownTo((annualHoursSaved / currentAnnualHours) * 10)

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
            case 'full-product-dev': formState.handleChange('projectsPerYear', 3); break
            case 'freelance-app-dev': formState.handleChange('projectsPerYear', 4); break
            case 'startup-founder': formState.handleChange('projectsPerYear', 1); break
            case 'indiehacker': formState.handleChange('projectsPerYear', 6); break
            case 'studio-lead': formState.handleChange('projectsPerYear', 7); break
        }
    }, [formState.values.identifiesWith])

    // ⬇ Update prefill of knownTech based on platformsTargeted

    const isNewToReactNative = platformsTargeted === 1
    const isNewToNextJS = platformsTargeted === 2

    useEffect(() => {

        let updatedKnownTech = knownTech

        if (isNewToReactNative) {
            updatedKnownTech = removeSetItem(updatedKnownTech, 'react-native')
            updatedKnownTech = removeSetItem(updatedKnownTech, 'expo')
        }

        if (isNewToNextJS) {
            updatedKnownTech = removeSetItem(updatedKnownTech, 'nextjs')
        }

        formState.handleChange('knownTech', updatedKnownTech)

    }, [platformsTargeted])

    // -- Render --

    return (
        <KeyboardAvoidingView {...inputScrollUtils.avoidingViewProps}>
            <StatusBar style={scheme.colorScheme === 'light' ? 'dark' : 'light'} />
            <ScrollView
                {...inputScrollUtils.scrollViewProps}
                className="flex flex-1 min-h-screen bg-background"
                contentContainerClassName="min-h-screen"
            >
                <View className="flex flex-1 justify-center items-center pt-28 pb-16">
                    <View className="flex flex-col w-full max-w-[500px] px-8">

                        <H1 onPress={() => scheme.setColorScheme(scheme.colorScheme !== 'dark' ? 'dark' : 'light')}>
                            {`Universal Forms Demo`}
                        </H1>

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

                        <H2 className="text-primary">
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

                        <H2 className="text-primary">
                            What platforms do you typically ship?
                        </H2>

                        <View className="h-4" />

                        <Select
                            placeholder="Select devices and targets"
                            options={{ '1': 'Web only 👉 Static / SSR + Hydration' }}
                            value={`${formState.values.platformsTargeted || ''}`}
                            onChange={(targets) => {
                                if (targets) formState.handleChange('platformsTargeted', +targets) // @ts-ignore
                                else formState.handleChange('platformsTargeted', undefined)
                            }}
                        >
                            <Select.Option value="2" label="Mobile 📲 iOS + Android" />
                            <Select.Option value="3" label="Universal 🚀 Web + Mobile" />
                        </Select>

                        <View className="h-1 w-12 my-6 bg-slate-300" />

                        {/* -- CheckList -- */}

                        <H2 className="text-primary">
                            Which DX features excite you?
                        </H2>

                        <View className="h-4" />
                        
                        <CheckList
                            options={FEATURES.entries}
                            {...formState.getInputProps('excitingFeatures')}
                        />

                        <View className="h-1 w-12 my-6 bg-slate-300" />

                        {/* -- Plugin Branches -- */}

                        {excitingFeatures.includes('git-plugins') && (
                            <>
                                <H2 className="text-primary">
                                    What plugins would you merge?
                                </H2>

                                <View className="h-4" />
                                
                                <CheckList
                                    options={PLUGINS.entries}
                                    {...formState.getInputProps('pluginsToMerge')}
                                />

                                <View className="h-1 w-12 my-6 bg-slate-300" />
                            </>
                        )}

                        {/* -- TextArea -- */}

                        <H2 className="text-primary">
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

                        {/* -- Results -- */}

                        {showResults && (
                            <>
                                <View className="h-6" />

                                <H1 className="text-primary text-5xl">
                                    {`Ship `}
                                    <Text className="text-blue-400">{`${annualEfficiencyRate}%`}</Text>
                                    {` faster`}
                                </H1>

                                <View className="h-6" />

                                <View className="flex flex-row items-center">
                                    <Button
                                        text={!isNewToNextJS ? "✅  Web" : "❇️  +Web"}
                                        type="outline"
                                        size="sm"
                                        className={cn('cursor-default', isNewToNextJS && 'border-success')}
                                    />
                                    <View className="w-4" />
                                    <Button
                                        text={!isNewToReactNative ? "✅  iOS" : "❇️  +iOS"}
                                        type="outline"
                                        size="sm"
                                        className={cn('cursor-default', isNewToReactNative && 'border-success')}
                                    />
                                    <View className="w-4" />
                                    <Button
                                        text={!isNewToReactNative ? "✅  Android" : "❇️  +Android"}
                                        type="outline"
                                        size="sm"
                                        className={cn('cursor-default', isNewToReactNative && 'border-success')}
                                    />
                                </View>

                                <View className="h-6" />

                                <H2 className="text-slate-500 text-3xl">
                                    <Text className="text-green-600 font-bold">{formatRelativeTime(annualHoursSaved)}</Text>
                                    {` of extra value delivered every year`}
                                </H2>

                                <View className="h-6" />

                                <View className="flex flex-row items-center">
                                    <NumberStepper
                                        key={`projects-per-year-${formState.values.identifiesWith}`}
                                        placeholder="projects per year"
                                        className="mr-4"
                                        textInputClassName="max-w-[130]"
                                        min={1}
                                        {...formState.getInputProps('projectsPerYear')}
                                    />
                                    <H2 className="text-secondary opacity-50">
                                        {`project${projectsPerYear > 1 ? 's' : ''} per year`}
                                    </H2>
                                </View>

                                <View className="h-12" />

                                <H3 className="text-slate-400 text-2xl">
                                    <Text className="text-blue-400 font-bold">{formatRelativeTime(learningGapHours, roundUpTo, 1)}</Text>
                                    {` to learn the ropes`}
                                </H3>

                                <View className="h-6" />

                                <H3 className="text-secondary">
                                    Team Knowledge?
                                </H3>

                                <View className="h-4" />

                                <CheckList
                                    key={`known-tech-${knownTech.length}`}
                                    options={TECH_KNOWLEDGE.entries}
                                    {...formState.getInputProps('knownTech')}
                                />

                                <View className="h-6" />
                            </>
                        )}

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
                                        className="text-primary no-underline"
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
                                    {JSON.stringify({
                                        currentSetupHoursPerProject,
                                        setupHoursPerProject,
                                        learningGapHours,
                                        annualSetupHoursSaved,
                                        ...formState,
                                    }, null, 2)}
                                </Text>
                            </>
                        )}

                        {inputScrollUtils.keyboardPaddedView}

                    </View>
                </View>

            </ScrollView>
            <BackButton
                backLink="/subpages/Universal%20Nav"
                color={getThemeColor('--primary')}
            />
        </KeyboardAvoidingView>
    )
}

/* --- Exports --------------------------------------------------------------------------------- */

export default FormsScreen
