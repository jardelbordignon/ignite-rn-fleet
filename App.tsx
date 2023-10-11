import { AppProvider, UserProvider } from '@realm/react'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components/native'

import { REALM_APP_ID } from '@env'
import { Loading } from 'src/views/components/loading'
import { SignIn } from 'src/views/screens/account/sign-in'
import { Home } from 'src/views/screens/home'
import theme from 'src/theme'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  if (!fontsLoaded) return <Loading />

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor="transparent" translucent />
        <UserProvider fallback={SignIn}>
          <Home />
        </UserProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
