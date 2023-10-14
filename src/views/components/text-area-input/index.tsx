import { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'

import * as S from './styles'

type Props = TextInputProps & {
  label: string
}

export const TextAreaInput = forwardRef<TextInput, Props>(
  ({ label, ...rest }, ref) => {
    return (
      <S.root>
        <S.label>{label}</S.label>
        <S.input ref={ref} {...rest} />
      </S.root>
    )
  }
)
