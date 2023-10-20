/**
 * Se usar o PROVIDER_GOOGLE apenas, ao rodar no ios um erro é lançado:
 * "AirGoogleMaps dir must be added to your xCode project to support GoogleMaps on iOS"
 *
 * É possível habilitar o google maps pelo xcode ou usar o PROVIDER_DEFAULT que usa então o mapa da apple mesmo
 * https://stackoverflow.com/questions/53436368/react-native-maps-airgooglemaps-dir-must-be-added-to-your-xcode-project-to-supp
 */
import { Car, FlagCheckered } from 'phosphor-react-native'
import { Platform } from 'react-native'
import MapView, {
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  MapViewProps,
  Marker,
  LatLng,
} from 'react-native-maps'

import { IconBox } from '../icon-box'

type Props = MapViewProps & {
  coords: LatLng[]
  delta?: number
}

export function Map({ coords, delta = 0.005, ...rest }: Props) {
  const firstCoord = coords[0]
  const lastCoord = coords[coords.length - 1]

  return (
    <MapView
      provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      style={{ width: '100%', height: 200 }}
      region={{
        latitude: lastCoord.latitude,
        longitude: lastCoord.longitude,
        latitudeDelta: delta,
        longitudeDelta: delta,
      }}
      {...rest}>
      <Marker coordinate={firstCoord}>
        <IconBox size="SMALL" icon={Car} />
      </Marker>

      {coords.length > 1 && (
        <Marker coordinate={lastCoord}>
          <IconBox size="SMALL" icon={FlagCheckered} />
        </Marker>
      )}
    </MapView>
  )
}
