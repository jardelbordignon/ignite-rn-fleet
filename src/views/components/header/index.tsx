import { useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import * as S from './styles'

type Props = {
  title: string
}

export function Header({ title }: Props) {
  const { goBack } = useNavigation()
  const { top } = useSafeAreaInsets()

  return (
    <S.root style={{ paddingTop: top + 32 }}>
      <Pressable onPress={goBack}>
        <S.arrowLeftSvg />
      </Pressable>

      <S.title>{title}</S.title>
    </S.root>
  )
}
