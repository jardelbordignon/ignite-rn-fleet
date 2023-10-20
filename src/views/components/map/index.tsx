/**
 * Se usar o PROVIDER_GOOGLE apenas, ao rodar no ios um erro é lançado:
 * "AirGoogleMaps dir must be added to your xCode project to support GoogleMaps on iOS"
 *
 * É possível habilitar o google maps pelo xcode ou usar o PROVIDER_DEFAULT que usa então o mapa da apple mesmo
 * https://stackoverflow.com/questions/53436368/react-native-maps-airgooglemaps-dir-must-be-added-to-your-xcode-project-to-supp
 */
import { Car, FlagCheckered } from 'phosphor-react-native'
import { useRef } from 'react'
import MapView, {
  PROVIDER_GOOGLE,
  MapViewProps,
  Marker,
  LatLng,
} from 'react-native-maps'

import { IconBox } from '../icon-box'
import * as S from './styles'

type Props = MapViewProps & {
  coords: LatLng[]
  delta?: number
}

export function Map({ coords, delta = 0.005, ...rest }: Props) {
  const mapRef = useRef<MapView>(null)

  const firstCoord = coords[0]
  const lastCoord = coords[coords.length - 1]

  const onMapLoaded = async () => {
    mapRef.current?.fitToSuppliedMarkers(['departure', 'arrival'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    })
  }

  return (
    <S.mapView
      ref={mapRef}
      //provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: lastCoord.latitude,
        longitude: lastCoord.longitude,
        latitudeDelta: delta,
        longitudeDelta: delta,
      }}
      onMapLoaded={onMapLoaded}
      {...rest}>
      <Marker coordinate={firstCoord} identifier="departure">
        <IconBox size="SMALL" icon={Car} />
      </Marker>

      {coords.length > 1 && (
        <>
          <Marker coordinate={lastCoord} identifier="arrival">
            <IconBox size="SMALL" icon={FlagCheckered} />
          </Marker>

          <S.polyline coordinates={coords} />
        </>
      )}
    </S.mapView>
  )
}
