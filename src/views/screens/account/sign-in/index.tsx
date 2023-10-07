import backgroundImg from 'src/assets/background.png'

import { Button } from 'src/views/components'
import * as S from './styles'

export function SignIn() {
  return (
    <S.root source={backgroundImg}>
      <S.title>Ignite Fleet</S.title>
      <S.slogan>Gestão de uso de veículos</S.slogan>
      <Button title="Entrar com Google" />
    </S.root>
  )
}
