import { MaskInputProps, Masks } from 'react-native-mask-input'

import * as S from './styles'

type Props = MaskInputProps & {
  label: string
}

export function LicensePlateInput({ label, ...rest }: Props) {
  return (
    <S.root>
      <S.label>{label}</S.label>
      <S.input mask={Masks.BRL_CAR_PLATE} {...rest} />
    </S.root>
  )
}
