import { X } from 'phosphor-react-native'

import type { ArrivalNavigationProps } from 'src/types/navigation'
import { Button, ButtonIcon, Header } from 'src/views/components'
import * as S from './styles'

export function Arrival({ navigation, route }: ArrivalNavigationProps) {
  const id = route.params.id.toString()

  return (
    <S.root>
      <Header title="Chegada" />
      <S.content>
        <S.label>Placa do veículo</S.label>
        <S.licensePlate>ABC-1B34</S.licensePlate>

        <S.label>Finalidade</S.label>
        <S.description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum vitae nemo
          facilis iure magni corporis soluta consectetur, voluptates excepturi culpa,
          dolore velit nobis quidem molestias suscipit ab! Alias, delectus incidunt.
        </S.description>

        <S.footer>
          <ButtonIcon icon={X} />
          <Button title="Registrar chegada" />
        </S.footer>
      </S.content>
    </S.root>
  )
}
