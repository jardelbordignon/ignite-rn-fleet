import { useApp, useUser } from '@realm/react'
import { Pressable } from 'react-native'

import * as S from './styles'

export function HomeHeader() {
  const app = useApp()
  const user = useUser()

  const handleLogout = () => {
    app.currentUser?.logOut()
  }

  return (
    <S.root>
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
