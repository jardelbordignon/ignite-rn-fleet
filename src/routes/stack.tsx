import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from 'src/views/screens/home'

const { Navigator, Screen } = createNativeStackNavigator()

export function Stack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
    </Navigator>
  )
}
