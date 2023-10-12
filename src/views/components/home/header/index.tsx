import { useApp, useUser } from '@realm/react'
import { Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import * as S from './styles'

export function HomeHeader() {
  const app = useApp()
  const user = useUser()
  const insets = useSafeAreaInsets()

  const handleLogout = () => {
    app.currentUser?.logOut()
  }

  return (
    <S.root style={{ paddingTop: insets.top + 32 }}>
      <S.picture
        source={{ uri: user?.profile.pictureUrl }}
        placeholder="T184i9j]j]00ayfQ~qj[ay9Fayfk" // https://blurha.sh/
      />
      <S.greeting>
        <S.message>Olá</S.message>
        <S.name>{user?.profile.name}</S.name>
      </S.greeting>

      <Pressable onPress={handleLogout}>
        <S.powerSvg />
      </Pressable>
    </S.root>
  )
}
