import { CarStatus } from 'src/views/components/car/status'
import { HomeHeader } from 'src/views/components/home/header'
import * as S from './styles'

export function Home() {
  return (
    <S.root>
      <HomeHeader />

      <S.content>
        <CarStatus />
      </S.content>
    </S.root>
  )
}
