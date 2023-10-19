import { Realm, useUser } from '@realm/react'
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
  const user = useUser()

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

  const progressNotification = (transferred: number, transferable: number) => {
    //console.log('transferred', transferred)
    //console.log('transferable', transferable)
    const percentage = (transferred / transferable) * 100
    console.log('Transferido', `${percentage}%`)
  }

  useEffect(fetchHistoric, [historic])

  useEffect(() => {
    fetchVehicleInUse()
    realm.addListener('change', fetchVehicleInUse)
    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehicleInUse)
      }
    }
  }, [])

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historyByUserQuery = realm
        .objects('Historic')
        .filtered(`user_id = '${user.id}'`)

      mutableSubs.add(historyByUserQuery, { name: 'historic_by_user' })
    })
  }, [realm])

  useEffect(() => {
    const syncSession = realm.syncSession

    if (!syncSession) return

    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification
    )

    return () => syncSession.removeProgressNotification(progressNotification)
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
