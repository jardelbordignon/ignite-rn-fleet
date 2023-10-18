import { Check } from 'phosphor-react-native'
import type { PressableProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import * as S from './styles'

export type HistoryCardProps = {
  id: string
  licensePlate: string
  created: string
  isSync: boolean
}

type Props = PressableProps & {
  data: HistoryCardProps
}

export function HistoryCard({ data, ...rest }: Props) {
  const { COLORS } = useTheme()
  const { created, isSync, licensePlate } = data

  return (
    <S.root {...rest}>
      <S.info>
        <S.licensePlate>{licensePlate}</S.licensePlate>
        <S.departure>{created}</S.departure>
      </S.info>
      <Check size={24} color={COLORS[isSync ? 'BRAND_LIGHT' : 'GRAY_400']} />
    </S.root>
  )
}
