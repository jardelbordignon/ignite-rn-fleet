import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from 'styled-components/native'

import type { IconProps } from '../button-icon'
import * as S from './styles'

type Props = {
  icon?: IconProps
  title: string
}

export function TopMessage({ icon: Icon, title }: Props) {
  const { COLORS } = useTheme()
  const { top } = useSafeAreaInsets()

  return (
    <S.root style={{ paddingTop: top - 4 }}>
      {Icon && <Icon size={18} color={COLORS.GRAY_100} />}
      <S.title>{title}</S.title>
    </S.root>
  )
}
