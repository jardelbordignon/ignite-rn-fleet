import type { IconProps as PhosphorIconProps } from 'phosphor-react-native'
import type { PressableProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import * as S from './styles'

export type IconProps = (props: PhosphorIconProps) => JSX.Element

type Props = PressableProps & {
  icon: IconProps
}

export function ButtonIcon({ icon: Icon, ...rest }: Props) {
  const { COLORS } = useTheme()

  return (
    <S.root style={({ pressed }) => pressed && { opacity: 0.85 }} {...rest}>
      <Icon size={24} color={COLORS.BRAND_MID} />
    </S.root>
  )
}
