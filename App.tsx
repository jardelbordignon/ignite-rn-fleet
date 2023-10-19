import 'react-native-get-random-values'
import { useNetInfo } from '@react-native-community/netinfo'
import { WifiSlash } from 'phosphor-react-native'
import { AppProvider, UserProvider } from '@realm/react'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'styled-components/native'

import { REALM_APP_ID } from '@env'
import { RealmProvider, syncConfiguration } from 'src/libs/realm'
import { Routes } from 'src/routes'
import { Loading, TopMessage } from 'src/views/components'
import { SignIn } from 'src/views/screens/account/sign-in'
import theme from 'src/theme'

export default function App() {
  const netInfo = useNetInfo()
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  if (!fontsLoaded) return <Loading />

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}>
          {!netInfo.isConnected && (
            <TopMessage title="Você está off-line" icon={WifiSlash} />
          )}
          <StatusBar backgroundColor="transparent" translucent />
          <UserProvider fallback={SignIn}>
            <RealmProvider sync={syncConfiguration} fallback={Loading}>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
