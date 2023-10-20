import type { IconProps } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import * as S from './styles'

export type IconBoxProps = (props: IconProps) => JSX.Element

type Props = {
  size?: S.SizeOpts
  icon: IconBoxProps
}

export function IconBox({ icon: Icon, size = 'NORMAL' }: Props) {
  const { COLORS } = useTheme()
  const iconSize = size === 'NORMAL' ? 24 : 16

  return (
    <S.root size={size}>
      <Icon size={iconSize} color={COLORS.BRAND_LIGHT} />
    </S.root>
  )
}
