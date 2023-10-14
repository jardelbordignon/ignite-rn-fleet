import { useRef, useState } from 'react'
import { Alert, TextInput, ScrollView } from 'react-native'

import { licensePlateValidate } from 'src/utils/validators'
import {
  Button,
  Header,
  LicensePlateInput,
  TextAreaInput,
} from 'src/views/components'

import * as S from './styles'

export function Departure() {
  const [licensePlate, setLicensePlate] = useState('')
  const [description, setDescription] = useState('')
  const descriptionRef = useRef<TextInput>(null)

  const handleDepartureRegister = () => {
    if (!licensePlateValidate(licensePlate)) {
      Alert.alert('Placa inválida', 'Informe corretamente a placa do veículo')
    }

    if (description.trim().length) {
      descriptionRef.current?.focus()
      Alert.alert('Finalidade', 'Informe a finalidade da utilização do veículo')
    }
  }

  return (
    <S.root>
      <Header title="Saída" />

      <S.keyboardAvoidingView>
        <ScrollView>
          <S.content>
            <LicensePlateInput
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

            <Button title="Registrar Saída" onPress={handleDepartureRegister} />
          </S.content>
        </ScrollView>
      </S.keyboardAvoidingView>
    </S.root>
  )
}
