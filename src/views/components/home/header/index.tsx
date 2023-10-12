import { Pressable } from 'react-native'

import * as S from './styles'

export function HomeHeader() {
  return (
    <S.root>
      <S.picture
        source={{ uri: 'https://github.com/jardelbordignon.png' }}
        placeholder="T184i9j]j]00ayfQ~qj[ay9Fayfk" // https://blurha.sh/
      />
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
