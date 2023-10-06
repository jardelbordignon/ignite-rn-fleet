import { ThemeProvider } from 'styled-components/native'

import { SignIn } from 'src/views/screens/account/sign-in';
import theme from 'src/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SignIn />
    </ThemeProvider>
  )
}
