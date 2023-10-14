import { forwardRef } from 'react'
import { TextInput } from 'react-native'
import { MaskInputProps, Masks } from 'react-native-mask-input'

import * as S from './styles'

type Props = MaskInputProps & {
  label: string
}

const CAR_PLATE_MASK = [/[A-Z]/, /[A-Z]/, /[A-Z]/, /\d/, /\w/, /\d/, /\d/]

export const LicensePlateInput = forwardRef<TextInput, Props>(
  ({ label, ...rest }, ref) => {
    return (
      <S.root>
        <S.label>{label}</S.label>
        <S.input ref={ref} mask={CAR_PLATE_MASK} {...rest} />
      </S.root>
    )
  }
)
