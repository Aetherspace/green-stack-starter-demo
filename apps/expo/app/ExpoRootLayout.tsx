import { Stack } from 'expo-router'
import UniversalAppProviders from '@app/screens/UniversalAppProviders'
import UniversalRootLayout from '@app/screens/UniversalRootLayout'
import { Image as ExpoContextImage } from '@green-stack/components/Image.expo'
import { Link as ExpoContextLink } from '@green-stack/navigation/Link.expo'
import { useRouter as useExpoContextRouter } from '@green-stack/navigation/useRouter.expo'
import { useRouteParams as useExpoRouteParams } from '@green-stack/navigation/useRouteParams.expo'

// -i- Expo Router's layout setup is much simpler than Next.js's layout setup
// -i- Since Expo doesn't require a custom document setup or server component root layout
// -i- Use this file to apply your Expo specific layout setup:
// -i- like rendering our Universal Layout and App Providers

/* --- <ExpoRootLayout> ------------------------------------------------------------------------ */

export default function ExpoRootLayout() {
  // Navigation
  const expoContextRouter = useExpoContextRouter()

  // -- Render --

  return (
    <UniversalAppProviders
      contextImage={ExpoContextImage}
      contextLink={ExpoContextLink}
      contextRouter={expoContextRouter}
      useContextRouteParams={useExpoRouteParams}
      isExpo
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
