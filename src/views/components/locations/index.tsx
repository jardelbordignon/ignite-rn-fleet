import { Car, FlagCheckered } from 'phosphor-react-native'

import { LocationInfo, LocationInfoProps } from 'src/views/components'

import * as S from './styles'

type Props = {
  departure: Omit<LocationInfoProps, 'icon'>
  arrival: Omit<LocationInfoProps, 'icon'>
}

export function Locations({ arrival, departure }: Props) {
  return (
    <S.root>
      <LocationInfo
        icon={Car}
        label={departure.label}
        description={departure.description}
      />

      <S.line />

      <LocationInfo
        icon={FlagCheckered}
        label={arrival.label}
        description={arrival.description}
      />
    </S.root>
  )
}
