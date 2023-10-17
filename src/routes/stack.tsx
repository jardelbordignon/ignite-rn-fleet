import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { NavigationParamList } from 'src/types/navigation'
import { Arrival } from 'src/views/screens/arrival'
import { Departure } from 'src/views/screens/departure'
import { Home } from 'src/views/screens/home'

const { Navigator, Screen } = createNativeStackNavigator<NavigationParamList>()

export function Stack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="arrival" component={Arrival} />
      <Screen name="departure" component={Departure} />
    </Navigator>
  )
}
