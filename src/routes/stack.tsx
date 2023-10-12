import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Departure } from 'src/views/screens/departure'
import { Home } from 'src/views/screens/home'

const { Navigator, Screen } = createNativeStackNavigator()

export function Stack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="departure" component={Departure} />
    </Navigator>
  )
}
