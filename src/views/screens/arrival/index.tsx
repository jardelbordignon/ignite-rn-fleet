'use strict'
import { X } from 'phosphor-react-native'
import { Alert } from 'react-native'
import { BSON } from 'realm'

import { useObject, useRealm } from 'src/libs/realm'
import { Historic } from 'src/libs/realm/schemas'
import type { ArrivalNavigationProps } from 'src/types/navigation'
import { Button, ButtonIcon, Header } from 'src/views/components'
import * as S from './styles'

export function Arrival({ navigation, route }: ArrivalNavigationProps) {
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

  const handleArrivalRegister = () => {
    try {
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
    </S.root>
  )
}
