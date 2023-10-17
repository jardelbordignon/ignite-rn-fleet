import type { ArrivalNavigationProps } from 'src/types/navigation'
import * as S from './styles'

export function Arrival({ navigation, route }: ArrivalNavigationProps) {
  const id = route.params.id.toString()

  return (
    <S.root>
      <S.title>Arrival {id}</S.title>
    </S.root>
  )
}
