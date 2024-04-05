import { Stack } from 'expo-router'
import UniversalAppProviders from '@app/core/screens/UniversalAppProviders'
import UniversalRootLayout from '@app/core/screens/UniversalRootLayout'
import { NativeWindStyleSheet } from 'nativewind'

// -i- Expo Router's layout setup is much simpler than Next.js's layout setup
// -i- Since Expo doesn't require a custom document setup or server component root layout
// -i- Use this file to apply your Expo specific layout setup:
// -i- like rendering our Universal Layout and App Providers

/* --- Settings -------------------------------------------------------------------------------- */

NativeWindStyleSheet.setOutput({
  default: 'native',
})

/* --- <ExpoRootLayout> ------------------------------------------------------------------------ */

export default function ExpoRootLayout() {
  return (
    <UniversalAppProviders>
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
