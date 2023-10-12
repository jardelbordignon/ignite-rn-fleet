import type { NavigationProps } from 'src/types/navigation'
import { CarStatus } from 'src/views/components/car/status'
import { HomeHeader } from 'src/views/components/home/header'
import * as S from './styles'

export function Home({ navigation }: NavigationProps) {
  const handleRegisterMovement = () => {
    navigation.navigate('departure')
  }

  return (
    <S.root>
      <HomeHeader />

      <S.content>
        <CarStatus onPress={handleRegisterMovement} />
      </S.content>
    </S.root>
  )
}
