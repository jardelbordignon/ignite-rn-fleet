import { X } from 'phosphor-react-native'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { BSON } from 'realm'
import type { LatLng } from 'react-native-maps'

import { useObject, useRealm } from 'src/libs/realm'
import { getStorageLocations } from 'src/libs/storage/location'
import { getLastSyncTimestamp } from 'src/libs/storage/sync'
import { Historic } from 'src/libs/realm/schemas'
import { stoptLocationTask } from 'src/tasks/background-location'
import type { ArrivalNavigationProps } from 'src/types/navigation'
import {
  Button,
  ButtonIcon,
  Header,
  LocationInfoProps,
  Locations,
  Map,
} from 'src/views/components'
import * as S from './styles'
import { getAddressLocation } from 'src/utils'

export function Arrival({ navigation, route }: ArrivalNavigationProps) {
  const [dataNotSynced, setDataNotSynced] = useState(false)
  const [coords, setCoords] = useState<LatLng[]>([])
  const [departure, setDeparture] = useState<LocationInfoProps>()
  const [arrival, setArrival] = useState<LocationInfoProps>()

  const { id } = route.params

  const historicItem = useObject(Historic, new BSON.UUID(id))
  const realm = useRealm()

  const isVehicleArrived = historicItem?.status === 'arrival'

  const cancelDeparture = async () => {
    realm.write(() => {
      realm.delete(historicItem)
    })

    await stoptLocationTask()

    navigation.goBack()
  }

  const handleCancelDeparture = () => {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: cancelDeparture },
    ])
  }

  const handleArrivalRegister = async () => {
    if (!historicItem) {
      return Alert.alert(
        'Erro',
        'Não foi possível obter dados para registar a chegada do veículo'
      )
    }

    try {
      const storedLocations = getStorageLocations()

      realm.write(() => {
        historicItem.status = 'arrival'
        historicItem.updated_at = new Date()
        historicItem.coords.push(...storedLocations)
      })

      await stoptLocationTask()
      Alert.alert('Chegada', 'Chegada registrada com sucesso!')
      navigation.goBack()
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível registrar a chegada do veículo.')
    }
  }

  const getLocationInfo = async () => {
    if (!historicItem) return

    const lastSync = getLastSyncTimestamp()
    const updateAt = historicItem.updated_at.getTime()
    setDataNotSynced(updateAt > lastSync)

    setCoords(isVehicleArrived ? historicItem.coords : getStorageLocations())

    if (isVehicleArrived) {
      const firstCoords = historicItem.coords[0]

      const departureAddressLocation = await getAddressLocation(firstCoords)

      const departureDatetime = new Date(firstCoords.timestamp)
        .toLocaleString('pt-BR', { hour12: false })
        .trim()
        .split(',')

      setDeparture({
        label: `Partida: ${departureAddressLocation?.name}`,
        description: `${departureDatetime[0]} às ${departureDatetime[1]}`,
      })

      if (isVehicleArrived) {
        const lastCoords = historicItem.coords[historicItem.coords.length - 1]

        const arrivalAddressLocation = await getAddressLocation(lastCoords)

        const arrivalDatetime = new Date(lastCoords.timestamp)
          .toLocaleString('pt-BR', { hour12: false })
          .trim()
          .split(',')

        setArrival({
          label: `Destino: ${arrivalAddressLocation?.name}`,
          description: `${arrivalDatetime[0]} às ${arrivalDatetime[1]}`,
        })
      }
    }
  }

  useEffect(() => {
    getLocationInfo()
  }, [historicItem])

  return (
    <S.root>
      <Header title={isVehicleArrived ? 'Detalhes' : 'Chegada'} />

      {!!coords.length && <Map coords={coords} />}

      <S.content>
        <Locations departure={departure} arrival={arrival} />

        <S.label>Placa do veículo</S.label>
        <S.licensePlate>{historicItem?.license_plate}</S.licensePlate>

        <S.label>Finalidade</S.label>
        <S.description>{historicItem?.description}</S.description>
      </S.content>

      {!isVehicleArrived && (
        <S.footer>
          <ButtonIcon icon={X} onPress={handleCancelDeparture} />
          <Button
            title="Registrar chegada"
            disabled={!historicItem}
            onPress={handleArrivalRegister}
          />
        </S.footer>
      )}

      {dataNotSynced && (
        <S.syncMessage>
          Sincronização da{' '}
          {historicItem?.status === 'departure' ? 'partida' : 'chegada'} pendente.
        </S.syncMessage>
      )}
    </S.root>
  )
}
