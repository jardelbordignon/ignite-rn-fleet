import { useUser } from '@realm/react'
import { Pressable } from 'react-native'

import * as S from './styles'

export function HomeHeader() {
  const user = useUser()

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

      <Pressable>
        <S.powerSvg />
      </Pressable>
    </S.root>
  )
}
