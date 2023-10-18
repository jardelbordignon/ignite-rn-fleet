import { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'

import type { NavigationProps } from 'src/types/navigation'
import { useQuery, useRealm } from 'src/libs/realm'
import { Historic } from 'src/libs/realm/schemas'
import { HistoryCard, HistoryCardProps } from 'src/views/components'
import { CarStatus } from 'src/views/components/car/status'
import { HomeHeader } from 'src/views/components/home/header'
import * as S from './styles'

export function Home({ navigation }: NavigationProps) {
  const [vehicleInUse, setVehicleInUse] = useState<Historic>()
  const [vehicleHistory, setVehicleHistory] = useState<HistoryCardProps[]>([])

  const historic = useQuery(Historic)
  const realm = useRealm()

  const handleRegisterMovement = () => {
    if (vehicleInUse?._id) {
      navigation.navigate('arrival', { id: vehicleInUse._id.toString() })
    } else {
      navigation.navigate('departure')
    }
  }

  const fetchVehicleInUse = () => {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0]
      setVehicleInUse(vehicle)
    } catch (error) {
      console.log(error)
      Alert.alert('Veículo em uso', 'Não foi possível carregar o veículo em uso.')
    }
  }

  const fetchHistoric = () => {
    try {
      const data = historic.filtered("status = 'arrival' SORT(created_at DESC)")
      const formattedVehicleHistory = data.map(item => {
        const [date, time] = item.created_at
          .toLocaleString('pt-BR', { hour12: false })
          .trim()
          .split(',')

        const historyCardData: HistoryCardProps = {
          id: item._id.toString(),
          licensePlate: item.license_plate,
          created: `Saída em ${date} às ${time}`,
          isSync: false,
        }
        return historyCardData
      })

      setVehicleHistory(formattedVehicleHistory)
    } catch (error) {
      console.log(error)
      Alert.alert('Histórico', 'Não foi possível carregar o histórico')
    }
  }

  const showHistoryDetails = (id: string) => {
    navigation.navigate('arrival', { id })
  }

  useEffect(fetchHistoric, [historic])

  useEffect(() => {
    fetchVehicleInUse()
    realm.addListener('change', fetchVehicleInUse)
    return () => realm.removeListener('change', fetchVehicleInUse)
  }, [])

  return (
    <S.root>
      <HomeHeader />

      <S.content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

        <S.title>Histórico</S.title>

        <FlatList
          data={vehicleHistory}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoryCard data={item} onPress={() => showHistoryDetails(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <S.label>Não foi encontrado registros de utilização de veículos.</S.label>
          }
        />
      </S.content>
    </S.root>
  )
}
