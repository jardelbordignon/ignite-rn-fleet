import { NavigationContainer } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

import { Stack } from './stack'
import { TopMessage } from 'src/views/components'

export function Routes() {
  const { top } = useSafeAreaInsets()

  return (
    <NavigationContainer>
      <Stack />

      <Toast
        config={{ info: ({ text1 }) => <TopMessage title={`${text1}`} /> }}
        topOffset={top}
      />
    </NavigationContainer>
  )
}
