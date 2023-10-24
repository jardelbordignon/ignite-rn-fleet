import { Car, FlagCheckered } from 'phosphor-react-native'

import { LocationInfo, LocationInfoProps } from 'src/views/components'

import * as S from './styles'

type Props = {
  departure?: LocationInfoProps
  arrival?: LocationInfoProps
}

export function Locations({ arrival, departure }: Props) {
  if (!departure) return <></>

  return (
    <S.root>
      <LocationInfo
        icon={Car}
        label={departure.label}
        description={departure.description}
      />

      {arrival && (
        <>
          <S.line />

          <LocationInfo
            icon={FlagCheckered}
            label={arrival.label}
            description={arrival.description}
          />
        </>
      )}
    </S.root>
  )
}
