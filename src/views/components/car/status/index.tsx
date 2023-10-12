import type { PressableProps } from 'react-native'

import * as S from './styles'

type Props = PressableProps & {
  licensePlate?: string
}

export function CarStatus({ licensePlate, ...rest }: Props) {
  const StyledIcon = licensePlate ? S.keySvg : S.carSvg
  const status = licensePlate ? 'chagada' : 'saída'
  const message = licensePlate
    ? `Veículo ${licensePlate} em uso. `
    : 'Nenhum veículo em uso. '

  return (
    <S.root {...rest}>
      <S.IconBox>
        <StyledIcon />
      </S.IconBox>

      <S.message>
        {message}
        {'\n'}
        <S.textHighlight>Toque aqui para registrar a {status}</S.textHighlight>
      </S.message>
    </S.root>
  )
}
