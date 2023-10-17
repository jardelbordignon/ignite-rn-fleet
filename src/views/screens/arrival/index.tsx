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

  const historic = useObject(Historic, new BSON.UUID(id))
  const realm = useRealm()

  const removeVehicleUsage = () => {
    realm.write(() => {
      realm.delete(historic)
    })

    navigation.goBack()
  }

  const handleRemoveVehicleUsage = () => {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: removeVehicleUsage },
    ])
  }

  return (
    <S.root>
      <Header title="Chegada" />

      <S.content>
        <S.label>Placa do veículo</S.label>
        <S.licensePlate>{historic?.license_plate}</S.licensePlate>

        <S.label>Finalidade</S.label>
        <S.description>{historic?.description}</S.description>

        <S.footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />
          <Button title="Registrar chegada" />
        </S.footer>
      </S.content>
    </S.root>
  )
}
