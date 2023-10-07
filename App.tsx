import { StatusBar } from 'react-native'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { ThemeProvider } from 'styled-components/native'

import { Loading } from 'src/views/components/loading'
import { SignIn } from 'src/views/screens/account/sign-in'
import theme from 'src/theme'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  if (!fontsLoaded) return <Loading/>

  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor='transparent' translucent />
      <SignIn />
    </ThemeProvider>
  )
}
