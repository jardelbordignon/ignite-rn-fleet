import * as S from './styles'

type Props = {
  licensePlate?: string
}

export function CarStatus({ licensePlate }: Props) {
  const StyledIcon = licensePlate ? S.keySvg : S.carSvg
  const status = licensePlate ? 'chagada' : 'saída'
  const message = licensePlate
    ? `Veículo ${licensePlate} em uso. `
    : 'Nenhum veículo em uso. '

  return (
    <S.root>
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
