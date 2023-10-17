import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import type { NavigationProps } from 'src/types/navigation'
import { useQuery } from 'src/libs/realm'
import { Historic } from 'src/libs/realm/schemas'
import { CarStatus } from 'src/views/components/car/status'
import { HomeHeader } from 'src/views/components/home/header'
import * as S from './styles'

export function Home({ navigation }: NavigationProps) {
  const [vehicleInUse, setVehicleInUse] = useState<Historic>()

  const historic = useQuery(Historic)

  const handleRegisterMovement = () => {
    if (vehicleInUse?._id) {
      navigation.navigate('arrival', { id: vehicleInUse._id.toString() })
    } else {
      navigation.navigate('departure')
    }
  }

  const fetchVehicle = () => {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0]
      setVehicleInUse(vehicle)
    } catch (error) {
      console.log(error)
      Alert.alert('Veículo em uso', 'Não foi possível carregar o veículo em uso.')
    }
  }

  useEffect(fetchVehicle, [])

  return (
    <S.root>
      <HomeHeader />

      <S.content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />
      </S.content>
    </S.root>
  )
}
