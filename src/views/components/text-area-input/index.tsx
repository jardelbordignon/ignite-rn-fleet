import type { TextInputProps } from 'react-native'

import * as S from './styles'

type Props = TextInputProps & {
  label: string
}

export function TextAreaInput({ label, ...rest }: Props) {
  return (
    <S.root>
      <S.label>{label}</S.label>
      <S.input placeholder="Vou utilizar o veículo para..." {...rest} />
    </S.root>
  )
}
