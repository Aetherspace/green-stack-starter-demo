import { Stack } from 'expo-router'
import UniversalAppProviders from '@app/core/screens/UniversalAppProviders'
import UniversalRootLayout from '@app/core/screens/UniversalRootLayout'
import { Link as ExpoContextLink } from '@app/core/navigation/Link.expo'
import { useRouter as useExpoContextRouter } from '@app/core/navigation/useRouter.expo'
import { useRouteParams as useExpoRouteParams } from '@app/core/navigation/useRouteParams.expo'

// -i- Expo Router's layout setup is much simpler than Next.js's layout setup
// -i- Since Expo doesn't require a custom document setup or server component root layout
// -i- Use this file to apply your Expo specific layout setup:
// -i- like rendering our Universal Layout and App Providers

/* --- <ExpoRootLayout/> ----------------------------------------------------------------------- */

export default function ExpoRootLayout() {
  // Navigation
  const expoContextRouter = useExpoContextRouter()

  // -- Render --

  return (
    <UniversalAppProviders
      contextLink={ExpoContextLink}
      contextRouter={expoContextRouter}
      useContextRouteParams={useExpoRouteParams}
    >
      <UniversalRootLayout>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#FFFFFF' },
            animation: 'slide_from_right',
          }}
        />
      </UniversalRootLayout>
    </UniversalAppProviders>
  )
}
