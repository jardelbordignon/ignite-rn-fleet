import { Header, LicensePlateInput } from 'src/views/components'

import * as S from './styles'
import { useState } from 'react'

export function Departure() {
  const [plate, setPlate] = useState('')
  return (
    <S.root>
      <Header title="Saída" />
      <S.content>
        <LicensePlateInput
          label="Placa do veículo"
          placeholder="BRA-1B34"
          value={plate}
          onChangeText={setPlate}
        />
      </S.content>
    </S.root>
  )
}
