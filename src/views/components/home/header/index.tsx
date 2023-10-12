import { Pressable } from 'react-native'

import * as S from './styles'

export function HomeHeader() {
  return (
    <S.root>
      <S.greeting>
        <S.message>Olá</S.message>
        <S.name>Jardel</S.name>
      </S.greeting>

      <Pressable>
        <S.powerSvg />
      </Pressable>
    </S.root>
  )
}
