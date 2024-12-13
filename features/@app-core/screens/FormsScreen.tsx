import { useState, useEffect, useRef } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import { cn, View, Text, H1, H2, H3, P, Link, ScrollView, KeyboardAvoidingView, getThemeColor } from '../components/styled'
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
import { isWeb } from '../appConfig'
import { Icon } from '@green-stack/components/Icon'
import { uppercaseFirstChar } from '@green-stack/utils/stringUtils'

/* --- Disclaimer ------------------------------------------------------------------------------ */

// -i- This demo screen serves multiple purposes -i-

// -1- For a sense of how we calculated the efficiency gains with this kit -> See lines 132 - 238
// -2- For a sense of how to use the form components and hooks -> See 110 - 130 and also 340 - 500

// -i- Feel free to delete this and other example screens manually
// -i- or through a merge of the 'with/clean-slate' branch (paid version only)

/* --- Constants ------------------------------------------------------------------------------- */

const oneDay = 8 // One day in work hours
const oneWeek = oneDay * 5 // One work week in hours

const FEATURES = inputOptions({
    'universal-starter': 'Write-once workflow for Web, iOS & Android',
    'git-plugins': 'Git based plugin branches & PRs',
    'stack-freedom': 'Choose my own Auth / DB / Mail / plugins',
    'zod-query-toolkit': 'Auto typed API\'s + fetching (zod, react-query)',
    'generators-scripts': 'Scripts and Generators to skip boilerplate',
    'designed-for-copypaste': 'Portable structure for copy-paste features',
    'universal-fs-routing': 'Universal file based routing (Expo + Next.js)',
} as const)

const IDENTITIES = inputOptions({
    'full-product-dev': 'Full-stack web or mobile dev',
    'freelance-app-dev': 'Freelance App Developer',
    'startup-founder': 'Startup Founder',
    'indiehacker': 'Indie Hacker / Solo App Dev',
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

const FormScreenProps = schema('FormScreenProps', {
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
    showBenefits: z.boolean().default(true),
    // -- Precalculated --
    projectsPerYear: z.number().min(1).default(1),
    currentSetupHoursPerProject: z.number().default(oneWeek),
    knownTech: z.array(TECH_KNOWLEDGE).default(TECH_KNOWLEDGE.options),
    minHourlyPrice: z.number().default(50),
})

type FormScreenProps = z.input<typeof FormScreenProps>

/* --- Components ------------------------------------------------------------------------------ */

const CustomRadioGroup = RadioGroup.create<FormScreenProps['identifiesWith']>()

const Li = ({ children }: { children: string | any$Todo }) => (
    <View className="flex-row items-center mb-2">
        <Icon name="CheckFilled" size={14} color={getThemeColor('--success')} className="mr-2" />
        <Text className="ml-1">{children}</Text>
    </View>
)

/* --- <FormsScreen/> ------------------------------------------------------------------------- */

export const FormsScreen = (props: FormScreenProps) => {
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
    const formState = useFormState(FormScreenProps, {
        initialValues: { ...props, ...params },
        validateOnChange,
    })

    // Vars
    const { showFormState, showResults, showBenefits, identifiesWith } = formState.values
    const { excitingFeatures, platformsTargeted = 1, projectsPerYear } = formState.values
    const { currentSetupHoursPerProject, pluginsToMerge, knownTech } = formState.values
    const projects = projectsPerYear > 1 ? 'projects' : 'project'

    // Flags
    const isFullStackDev = identifiesWith === IDENTITIES.enum['full-product-dev']
    const isFreelanceDev = identifiesWith === IDENTITIES.enum['freelance-app-dev']
    const isStartupFounder = identifiesWith === IDENTITIES.enum['startup-founder']
    const isIndieHacker = identifiesWith === IDENTITIES.enum['indiehacker']
    const isStudioLead = identifiesWith === IDENTITIES.enum['studio-lead']

    const isDev = isFullStackDev || isFreelanceDev || isIndieHacker || isStudioLead
    const isProvider = isFreelanceDev || isStudioLead
    const isStartup = isStartupFounder || isIndieHacker

    const shipsWebOnly = platformsTargeted === 1
    const shipsMobileOnly = platformsTargeted === 2
    const shipsUniversal = platformsTargeted === 3

    // Theme
    const scheme = useColorScheme()

    // -- Result Calculation --

    // Starting point = 1 week of setup on average by default (editable)
    let setupHoursPerProject = currentSetupHoursPerProject || oneWeek

    // ⬇ Calculate additional plugin hours saved based on plugins merged

    let pluginHoursSaved = oneDay // Default to 1 day saved for other plugins
    if (pluginsToMerge.includes('auth')) pluginHoursSaved += oneDay // Auth plugins
    if (pluginsToMerge.includes('db')) pluginHoursSaved += 5 // DB plugins
    if (pluginsToMerge.includes('mail')) pluginHoursSaved += oneDay // Mail plugins
    if (pluginsToMerge.includes('notifications')) pluginHoursSaved += 5 // Notifications plugins
    if (pluginsToMerge.includes('payments')) pluginHoursSaved += oneDay * 2 // Payments plugins
    if (pluginsToMerge.includes('storage')) pluginHoursSaved += 4 // Storage plugins

    // ⬇ Add additional hours saved per project based on exciting features

    const wantsUniversalStarter = excitingFeatures.includes('universal-starter')
    const platformSetupHours = oneWeek * (platformsTargeted || 1)
    setupHoursPerProject += wantsUniversalStarter ? platformSetupHours : oneWeek

    if (excitingFeatures.includes('git-plugins')) setupHoursPerProject += pluginHoursSaved // Additional time saved
    if (excitingFeatures.includes('stack-freedom')) setupHoursPerProject += oneDay // No time spent removing unknonw tech
    if (excitingFeatures.includes('zod-query-toolkit')) setupHoursPerProject += 12 // Automating API typing and fetching
    if (excitingFeatures.includes('generators-scripts')) setupHoursPerProject += oneDay // No more boilerplate code
    if (excitingFeatures.includes('designed-for-copypaste')) setupHoursPerProject += 16 // Copy paste features from earlier projects
    if (excitingFeatures.includes('universal-fs-routing')) setupHoursPerProject += oneDay // Universal automated routing + deeplinks

    // ⬇ Figure out delivery efficiency based on platforms targeted

    let deliveryEfficiency = 1 // Default to Universal App Delivery
    if (platformsTargeted === 2) deliveryEfficiency = 1 + 0.75 // From Mobile = 75% more efficient
    if (platformsTargeted === 1) deliveryEfficiency = 1 + 1.5 // From Web = 150% more efficient
    
    setupHoursPerProject = setupHoursPerProject * deliveryEfficiency

    // ⬇ Subtract the learning gap hours based on known tech

    let learningGapHours = oneDay // 1 day for learning the universal starterkit and way of working
    if (!knownTech.includes('typescript')) learningGapHours += oneDay * 2 // TS basics
    if (!knownTech.includes('react')) learningGapHours += oneDay * 4 // React basics
    if (!knownTech.includes('react-native')) learningGapHours += oneDay * 2 // RN basics
    if (!knownTech.includes('expo')) learningGapHours += oneDay * 2 // Expo basics
    if (!knownTech.includes('nextjs')) learningGapHours += oneDay * 3 // Next.js basics
    if (!knownTech.includes('zod')) learningGapHours += oneDay / 2 // Zod basics
    if (!knownTech.includes('react-query')) learningGapHours += oneDay // React Query basics
    if (excitingFeatures.includes('git-plugins')) learningGapHours += 2 * pluginsToMerge.length // Plugin PR Reviews

    // ⬇ Add extra learning gap hours based on cumulative team knowledge gap
    
    const numRequiredTech = Object.keys(TECH_KNOWLEDGE.entries).length
    const numConceptsKnown = knownTech.length
    const numConceptsToLearn = Math.max(numRequiredTech - numConceptsKnown, 0)
    const cumulativeKnowledgeGapModifier = 1 + numConceptsToLearn * 0.15
    
    learningGapHours = Math.max(1, learningGapHours * cumulativeKnowledgeGapModifier)
    
    const learningGapDecimals = learningGapHours < (oneWeek * 2) ? 1 : 0
    
    // ⬇ Final efficiency calculation
    
    const formatRelativeTime = (
        hoursSaved = annualHoursSaved,
        roundFn = roundDownTo,
        decimals = 0,
    ) => {
        const daysSaved = roundFn(hoursSaved / 8, decimals)
        const weeksSaved = roundFn(daysSaved / 5, decimals) // Exclude weekends
        const monthsSaved = roundFn(weeksSaved / 4, decimals)
        if (monthsSaved > 1) return `${monthsSaved} month${monthsSaved > 1 ? 's' : ''}`
        if (weeksSaved >= 1.5) return `${weeksSaved} week${weeksSaved > 1 ? 's' : ''}`
        if (daysSaved >= 1.5) return `${daysSaved} day${daysSaved > 1 ? 's' : ''}`
        return `${hoursSaved} hour${hoursSaved > 1 ? 's' : ''}`
    }

    const estAnnualSetupHoursSaved = setupHoursPerProject * projectsPerYear
    const annualHoursSaved = roundDownTo(estAnnualSetupHoursSaved - learningGapHours)

    const currentEfficiencyMultiplier = !excitingFeatures.includes('universal-starter') ? 1 : deliveryEfficiency
    const currentEfficiencyRate = roundDownTo(Math.max(1, currentEfficiencyMultiplier - currentEfficiencyMultiplier / 10))
    
    const currentAnnualSetupHours = currentSetupHoursPerProject * projectsPerYear / currentEfficiencyRate
    const annualAvgEfficiencyBoost = roundDownTo((annualHoursSaved / currentAnnualSetupHours) * 10)

    const strAnnualSetupTimeSaved = formatRelativeTime(estAnnualSetupHoursSaved, roundDownTo)
    const [strSetupTimeUnitsSaved, rawDownRoundedUnit] = strAnnualSetupTimeSaved.split(' ')
    const numSetupTimeUnitsSaved = +strSetupTimeUnitsSaved

    let annualSetupHoursSaved = numSetupTimeUnitsSaved // Hours
    if (rawDownRoundedUnit.includes('day')) annualSetupHoursSaved = numSetupTimeUnitsSaved * oneDay
    if (rawDownRoundedUnit.includes('week')) annualSetupHoursSaved = numSetupTimeUnitsSaved * oneWeek
    if (rawDownRoundedUnit.includes('month')) annualSetupHoursSaved = numSetupTimeUnitsSaved * oneWeek * 4

    const annualWorkDays = 260 // Work days per year
    const annualWorkHours = annualWorkDays * oneDay // Work hours per year
    
    const annualHoursValueProvided = annualWorkHours + annualSetupHoursSaved
    const finalEfficiencyRate = roundDownTo(((annualHoursValueProvided / annualWorkHours) * 100) - 100)

    // ⬇ Determine benefits & breakdown data + highlights

    let identity:string = IDENTITIES.entries[identifiesWith] || 'mystery developer'

    if (shipsWebOnly && isFullStackDev) identity = 'Full-stack Web App Developer'
    if (shipsMobileOnly && isFullStackDev) identity = 'Full-stack Mobile App Developer'
    if (shipsUniversal && isFullStackDev) identity = 'Full-stack Universal App Developer'

    if (shipsWebOnly && isFreelanceDev) identity = 'Freelance Web App Developer'
    if (shipsMobileOnly && isFreelanceDev) identity = 'Freelance Mobile App Developer'
    if (shipsUniversal && isFreelanceDev) identity = 'Freelance Universal App Developer'

    if (isStudioLead) identity = 'Digital Product Studio'
    if (isStartupFounder) identity = 'Startup Founder'
    if (isIndieHacker) identity = 'Solo Indie Dev'

    const efficiencyComparison = Math.max(deliveryEfficiency * 100 - 100, finalEfficiencyRate)
    const showValueDelivered = efficiencyComparison > 10 && annualHoursSaved > 0
    const showEfficiencyBoost = efficiencyComparison > 10 && annualAvgEfficiencyBoost > 0
    const showRepositioningBenefits = isProvider && efficiencyComparison > 34

    let benefitLevel = 'only slightly'
    if (efficiencyComparison > 20) benefitLevel = 'moderately'
    if (efficiencyComparison > 50) benefitLevel = 'significantly'
    if (efficiencyComparison > 100) benefitLevel = 'immensely'

    let beneficial = 'slight'
    if (efficiencyComparison > 34) beneficial = 'somewhat significant'
    if (efficiencyComparison > 50) beneficial = 'significant'
    if (efficiencyComparison > 100) beneficial = 'immense'

    let convincee = 'you or your devs'
    if (isStartupFounder) convincee = 'your technical co-founder'
    if (isIndieHacker) convincee = 'the dev in you'
    if (isStudioLead) convincee = 'your dev team'
    if (isFreelanceDev) convincee = `your client's dev team`

    let handover = 'to other dev teams'
    if (isProvider) handover = 'to your clients'
    if (isStartup) handover = 'to potential acquirers'

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
        switch (identifiesWith) {
            case 'full-product-dev': formState.handleChange('projectsPerYear', 3); break
            case 'freelance-app-dev': formState.handleChange('projectsPerYear', 4); break
            case 'startup-founder': formState.handleChange('projectsPerYear', 1); break
            case 'indiehacker': formState.handleChange('projectsPerYear', 6); break
            case 'studio-lead': formState.handleChange('projectsPerYear', 7); break
        }
    }, [identifiesWith])

    // ⬇ Update prefill of knownTech based on platformsTargeted

    useEffect(() => {

        let updatedKnownTech = knownTech

        if (shipsWebOnly) {
            updatedKnownTech = removeSetItem(updatedKnownTech, 'react-native')
            updatedKnownTech = removeSetItem(updatedKnownTech, 'expo')
        }

        if (shipsMobileOnly) {
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
                            <RadioGroup.Option value="indiehacker" label="Indie Hacker / Solo App Dev" />
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
                            maxLength={500}
                            numberOfLines={5}
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
                                    {showEfficiencyBoost ? (
                                        <Text className="text-blue-400">
                                            {`${annualAvgEfficiencyBoost}% `}
                                        </Text>
                                    ) : (
                                        <Text className="text-warn">
                                            {`slightly `}
                                        </Text>
                                    )}
                                    {`more efficiently`}
                                </H1>

                                <View className="h-6" />

                                <View className="flex flex-row items-center">
                                    <Button
                                        text={!shipsMobileOnly ? "✅  Web" : "❇️  + Web"}
                                        type="outline"
                                        size="sm"
                                        className={cn('cursor-default', shipsMobileOnly && 'border-success')}
                                    />
                                    <View className="w-4" />
                                    <Button
                                        text={!shipsWebOnly ? "✅  iOS" : "❇️  + iOS"}
                                        type="outline"
                                        size="sm"
                                        className={cn('cursor-default', shipsWebOnly && 'border-success')}
                                    />
                                    <View className="w-4" />
                                    <Button
                                        text={!shipsWebOnly ? "✅  Android" : "❇️  + Android"}
                                        type="outline"
                                        size="sm"
                                        className={cn('cursor-default', shipsWebOnly && 'border-success')}
                                    />
                                </View>

                                <View className="h-6" />

                                {showValueDelivered && (
                                    <H2 className="text-slate-500 text-3xl">
                                        <Text className="text-green-600 font-bold">{formatRelativeTime(annualHoursSaved)}</Text>
                                        {` of extra value delivered yearly`}
                                    </H2>
                                )}

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
                                    <Text className="text-blue-400 font-bold">{formatRelativeTime(learningGapHours, roundUpTo, learningGapDecimals)}</Text>
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

                                <View className="flex-row">
                                    <Button
                                        text={showBenefits ? 'Hide Breakdown' : 'Benefits & Breakdown'}
                                        iconLeft={!showBenefits ? 'AddFilled' : undefined}
                                        iconRight={showBenefits ? 'ChevronUpFilled' : undefined}
                                        type={(showBenefits || !formState.values.identifiesWith) ? 'secondary' : 'success'}
                                        size="md"
                                        onPress={() => formState.handleChange('showBenefits', !showBenefits)}
                                        disabled={!formState.values.identifiesWith}
                                        fullWidth
                                    />
                                </View>

                                <View className="h-6" />
                            </>
                        )}

                        {/* -- Benefits -- */}

                        {showBenefits && showResults && (
                            <>
                                <View className="h-2" />

                                {/* -- Efficiency -- */}

                                <P className="text-muted">
                                    {`As a `}
                                    <Text className="text-primary font-bold">{identity}</Text>
                                    {`, you stand to benefit `}
                                    <Text className="text-muted italic">{benefitLevel}</Text>
                                    {` from the efficiency gains of this starterkit:`}
                                </P>

                                <View className="h-6" />

                                <Li>{`${setupHoursPerProject} hours on setup saved per project`}</Li>
                                <Li>{`Web + iOS + Android (write-once)`}</Li>
                                {!shipsUniversal && (
                                    <Li>{`= ${(deliveryEfficiency - 1) * 100}% more deliverables / project (roughly)`}</Li>
                                )}


                                {showValueDelivered && (
                                    <>
                                        <View className="h-4" />

                                        <Li>{`Only ${formatRelativeTime(learningGapHours, roundUpTo, learningGapDecimals)} to learn the stack`}</Li>
                                        <Li>{`= ${formatRelativeTime(annualHoursSaved)} of setup saved at ${projectsPerYear} ${projects} / year`}</Li>
                                        <Li>{`= ${finalEfficiencyRate}% extra features delivered / year`}</Li>
                                    </>
                                )}

                                {showEfficiencyBoost && (
                                    <>
                                        <View className="h-4" />

                                        <Li>{`Resulting in a ${annualAvgEfficiencyBoost}% total yearly value boost`}</Li>
                                    </>
                                )}

                                {/* -- Positioning -- */}

                                {showRepositioningBenefits && (
                                    <>
                                        <View className="h-8" />

                                        <P className="text-muted">
                                            {`This ${beneficial} `}
                                            <Text className="text-muted italic">
                                                {`increase in efficiency and deliverables,`}
                                            </Text>
                                            {` grants you `}
                                            <Text className="text-primary font-bold">
                                                more flexibility
                                            </Text>
                                            {` towards clients and projects:`}
                                        </P>

                                        <View className="h-6" />

                                        <Li>{`Reposition as a premium service provider`}</Li>
                                        <Li>{`Gain an edge over competition`}</Li>
                                        {!shipsUniversal && <Li>{`Charge higher for more platforms delivered`}</Li>}

                                        <View className="h-4" />

                                        <Li>{`Spend time won elsewhere (features / QA / R&D)`}</Li>
                                        <Li>{`Underpromise, automatically overdeliver`}</Li>
                                    </>
                                )}

                                {/* -- Universal Apps -- */}

                                {!shipsUniversal && (
                                    <>
                                        <View className="h-8" />

                                        <P className="text-muted">
                                            {`Software starting as `}
                                            <Text className="text-primary font-bold">
                                                {`write-once, universal apps`}
                                            </Text>
                                            {` have some benefits of their own:`}
                                        </P>

                                        <View className="h-6" />

                                        <Li>{`Be on any device / platform customers prefer`}</Li>
                                        <Li><>{`More platforms = `}<Text className="italic">more trust</Text></></Li>
                                        <Li>{`More trust = more sales / conversions`}</Li>

                                        <View className="h-4" />

                                        <Li><>{`Your app will have `}<Text className="font-bold">universal deeplinks</Text></></Li>
                                        <Li>{`Whichever page / device, users can share urls`}</Li>
                                        <Li>{`If a recipient has the app, it opens there`}</Li>
                                        <Li>{`If not, the page opens on web instead`}</Li>

                                        <View className="h-4" />

                                        <Li>{`Organic traffic from web (SEO + cheaper ads)`}</Li>
                                        <Li>{`Higher conversions from mobile`}</Li>
                                    </>
                                )}

                                {/* -- Dev Benefits -- */}

                                <View className="h-8" />

                                <View className="h-1 w-12 my-6 bg-slate-300" />

                                <View className="h-6" />                                        

                                <P className="text-muted">
                                    <Text className="text-primary font-bold">
                                        {uppercaseFirstChar(convincee)}
                                    </Text>
                                    {` might like some docs on the productivity gains from this way of working:`}
                                </P>

                                <View className="h-6" />

                                <Li>
                                    <Link href="https://universal-base-starter-docs.vercel.app/universal-routing" target="_blank">
                                        {`Universal Routing`}
                                    </Link>
                                    {` (file based, auto deeplinks)`}
                                </Li>
                                <Li>
                                    <Link href="https://universal-base-starter-docs.vercel.app/data-fetching" target="_blank">
                                        {`Cross-platform Data-Fetching`}
                                    </Link>
                                    {` (react-query)`}
                                </Li>
                                <Li>
                                    <Link href="https://universal-base-starter-docs.vercel.app/write-once-styles" target="_blank">
                                        {`Style universal UI`}
                                    </Link>
                                    {` with Nativewind (tailwind)`}
                                </Li>

                                <View className="h-4" />

                                <Li>
                                    <Link href="https://universal-base-starter-docs.vercel.app/single-sources-of-truth" target="_blank">
                                        {`Schemas as Single Sources of Truth`}
                                    </Link>
                                    {` (zod)`}
                                </Li>
                                <Li>
                                    <Link href="https://universal-base-starter-docs.vercel.app/data-resolvers" target="_blank">
                                        {`Effortless GraphQL API's`}
                                    </Link>
                                    {` (optional)`}
                                </Li>

                                {isProvider && (
                                    <>
                                        <View className="h-4" />

                                        <Li>
                                            <Link href="https://universal-base-starter-docs.vercel.app/project-structure" target="_blank">
                                                {`Portable architecture`}
                                            </Link>
                                            {` (copy-paste features)`}
                                        </Li>
                                    </>
                                )}

                                {/* -- Docs Benefits -- */}

                                <View className="h-8" />

                                <View className="h-1 w-12 my-6 bg-slate-300" />

                                <View className="h-6" />

                                <P className="text-muted">
                                    {`This starterkit can `}
                                    <Text className="text-primary font-bold">
                                        {`generate docs`}
                                    </Text>
                                    {` as you build. These docs will grow with your ${projects}, meaning:`}
                                </P>

                                <View className="h-6" />

                                <Li>{`Easier onboardings for new devs`}</Li>
                                <Li>{`Easier handovers ${handover}`}</Li>
                                <Li>{`Devs can send each other preview urls`}</Li>

                                <View className="h-6" />

                                <P className="text-muted">
                                    {`Check out some `}
                                    <Link href="https://universal-base-starter-docs.vercel.app/@app-core/components/Button" target="_blank">
                                        {`example component docs`}
                                    </Link>
                                    {` to know what that looks like. Try changing the preview, refreshing or sharing a url.`}
                                </P>

                                {isDev && <View className="h-4" />}

                                {isDev && (
                                    <P className="text-muted">
                                        {`It's a good example of what's possible when you use `}
                                        <Link href="https://universal-base-starter-docs.vercel.app/single-sources-of-truth#building-schemas-with-zod" target="_blank">
                                            {`Zod schemas`}
                                        </Link>
                                        {` as the `}
                                        <Link href="https://universal-base-starter-docs.vercel.app/single-sources-of-truth" target="_blank">
                                            {`Single Source of Truth`}
                                        </Link>
                                        {`.`}
                                    </P>
                                )}

                                <View className="h-8" />

                                <View className="h-1 w-12 my-6 bg-slate-300" />
                            </>
                        )}

                        <View className="h-8" />

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
                                        href="https://universal-base-starter-docs.vercel.app/form-management"
                                        target="_blank"
                                    >
                                        {`formState = useFormState( zod )`}
                                    </Link>
                                </H3>

                                <View className="h-2" />

                                <Link
                                    className="no-underline"
                                    href="https://universal-base-starter-docs.vercel.app/form-management"
                                    target="_blank"
                                >
                                    📗 Read form-management docs
                                </Link>

                                <View className="h-4" />

                                <Text className="text-start">
                                    {JSON.stringify({
                                        ...formState,
                                        metadata: {
                                            currentSetupHoursPerProject,
                                            currentAnnualSetupHours,
                                            setupHoursPerProject,
                                            learningGapHours,
                                            annualHoursSaved,
                                            annualSetupHoursSaved,
                                            annualAvgEfficiencyBoost,
                                            isWeb,
                                            deliveryEfficiency,
                                            finalEfficiencyRate,
                                            efficiencyComparison,
                                            numRequiredTech,
                                            numConceptsKnown,
                                            numConceptsToLearn,
                                            cumulativeKnowledgeGapModifier,
                                            strAnnualSetupTimeSaved,
                                            annualHoursValueProvided,
                                            annualWorkHours,
                                        }
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

/* --- Documentation --------------------------------------------------------------------------- */

export const getDocumentationProps = FormScreenProps.documentationProps('FormScreen')

/* --- Exports --------------------------------------------------------------------------------- */

export default FormsScreen
