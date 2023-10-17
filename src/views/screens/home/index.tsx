import { useEffect } from 'react'

import type { NavigationProps } from 'src/types/navigation'
import { useQuery } from 'src/libs/realm'
import { Historic } from 'src/libs/realm/schemas'
import { CarStatus } from 'src/views/components/car/status'
import { HomeHeader } from 'src/views/components/home/header'
import * as S from './styles'

export function Home({ navigation }: NavigationProps) {
  const historic = useQuery(Historic)

  const handleRegisterMovement = () => {
    navigation.navigate('departure')
  }

  const fetchVehicle = () => {
    console.log(historic)
  }

  useEffect(fetchVehicle, [])

  return (
    <S.root>
      <HomeHeader />

      <S.content>
        <CarStatus onPress={handleRegisterMovement} />
      </S.content>
    </S.root>
  )
}
