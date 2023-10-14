import { useRef, useState } from 'react'
import { TextInput, ScrollView } from 'react-native'

import {
  Button,
  Header,
  LicensePlateInput,
  TextAreaInput,
} from 'src/views/components'

import * as S from './styles'

export function Departure() {
  const descriptionRef = useRef<TextInput>(null)
  const [plate, setPlate] = useState<string>()

  const handleDepartureRegister = () => {
    console.log('Ok')
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
              value={plate}
              onChangeText={setPlate}
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              returnKeyType="send"
              onSubmitEditing={handleDepartureRegister}
            />

            <Button title="Registrar Saída" onPress={handleDepartureRegister} />
          </S.content>
        </ScrollView>
      </S.keyboardAvoidingView>
    </S.root>
  )
}
