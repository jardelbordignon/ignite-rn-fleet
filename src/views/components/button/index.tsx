import type { PressableProps } from 'react-native'

import * as S from './styles'

type Props = PressableProps & {
  title: string
  submitting?: boolean
}

export function Button({ disabled, submitting = false, title, ...rest }: Props) {
  return (
    <S.root
      disabled={disabled || submitting}
      style={({ pressed }) => pressed && { opacity: 0.85 }}
      {...rest}>
      {submitting ? <S.submittingIndicator /> : <S.title>{title}</S.title>}
    </S.root>
  )
}
