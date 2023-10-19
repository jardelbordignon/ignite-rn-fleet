import { useUser } from '@realm/react'
import { useRef, useState, useEffect } from 'react'
import { Alert, TextInput, ScrollView } from 'react-native'
import { useForegroundPermissions } from 'expo-location'

import { useRealm } from 'src/libs/realm'
import { Historic } from 'src/libs/realm/schemas'
import type { NavigationProps } from 'src/types/navigation'
import { licensePlateValidate } from 'src/utils/validators'
import {
  Button,
  Header,
  LicensePlateInput,
  TextAreaInput,
} from 'src/views/components'

import * as S from './styles'

export function Departure({ navigation }: NavigationProps) {
  const [submitting, setSubmitting] = useState(false)
  const [licensePlate, setLicensePlate] = useState('')
  const [description, setDescription] = useState('')
  const licensePlateRef = useRef<TextInput>(null)
  const descriptionRef = useRef<TextInput>(null)

  const user = useUser()
  const realm = useRealm()

  const [foregroundPermissions, getForegroundPermissions] = useForegroundPermissions()

  const handleDepartureRegister = () => {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus()
        return Alert.alert(
          'Placa inválida',
          'Informe corretamente a placa do veículo'
        )
      }

      if (!description.trim().length) {
        descriptionRef.current?.focus()
        return Alert.alert(
          'Finalidade',
          'Informe a finalidade da utilização do veículo'
        )
      }

      setSubmitting(true)

      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user.id,
            description,
            license_plate: licensePlate,
          })
        )
      })

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso!')
      navigation.goBack()
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível registrar a saída do veículo')
      setSubmitting(false)
    }
  }

  useEffect(() => {
    getForegroundPermissions()
  }, [])

  if (!foregroundPermissions?.granted) {
    return (
      <S.root>
        <Header title="Saída" />
        <S.message>
          Você precisa permitir que o aplicativo tenha acesso a localização para
          utilizar essa funcionalidade. Por favor, acesse as configurações do seu
          dispositivo para conceder essa permissão ao aplicativo.
        </S.message>
      </S.root>
    )
  }

  return (
    <S.root>
      <Header title="Saída" />

      <S.keyboardAwareScrollView>
        <ScrollView>
          <S.content>
            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA-1B34"
              value={licensePlate}
              onChangeText={setLicensePlate}
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              blurOnSubmit
              value={description}
              onChangeText={setDescription}
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
            />

            <Button
              title="Registrar Saída"
              onPress={handleDepartureRegister}
              submitting={submitting}
            />
          </S.content>
        </ScrollView>
      </S.keyboardAwareScrollView>
    </S.root>
  )
}
