import { X } from 'phosphor-react-native'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { BSON } from 'realm'

import { useObject, useRealm } from 'src/libs/realm'
import { getLastSyncTimestamp } from 'src/libs/storage/sync'
import { Historic } from 'src/libs/realm/schemas'
import { stoptLocationTask } from 'src/tasks/background-location'
import type { ArrivalNavigationProps } from 'src/types/navigation'
import { Button, ButtonIcon, Header } from 'src/views/components'
import * as S from './styles'

export function Arrival({ navigation, route }: ArrivalNavigationProps) {
  const [dataNotSynced, setDataNotSynced] = useState(false)
  const { id } = route.params

  const historicItem = useObject(Historic, new BSON.UUID(id))
  const realm = useRealm()

  const isVehicleInUse = historicItem?.status === 'departure'

  const cancelDeparture = () => {
    realm.write(() => {
      realm.delete(historicItem)
    })

    navigation.goBack()
  }

  const handleCancelDeparture = () => {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: cancelDeparture },
    ])
  }

  const handleArrivalRegister = async () => {
    try {
      await stoptLocationTask()

      realm.write(() => {
        historicItem!.status = 'arrival'
        historicItem!.updated_at = new Date()
      })

      Alert.alert('Chegada', 'Chegada registrada com sucesso!')
      navigation.goBack()
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível registrar a chegada do veículo.')
    }
  }

  useEffect(() => {
    const lastSync = getLastSyncTimestamp()
    setDataNotSynced(historicItem!.updated_at.getTime() > lastSync)
  }, [])

  return (
    <S.root>
      <Header title={isVehicleInUse ? 'Chegada' : 'Detalhes'} />

      <S.content>
        <S.label>Placa do veículo</S.label>
        <S.licensePlate>{historicItem?.license_plate}</S.licensePlate>

        <S.label>Finalidade</S.label>
        <S.description>{historicItem?.description}</S.description>
      </S.content>

      {isVehicleInUse && (
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
