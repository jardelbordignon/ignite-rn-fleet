import styled from 'styled-components/native'
import MapView, { Polyline } from 'react-native-maps'

export const mapView = styled(MapView)`
  width: 100%;
  height: 200px;
`

export const polyline = styled(Polyline).attrs(({ theme }) => ({
  strokeColor: theme.COLORS.GRAY_700,
  strokeWidth: 5,
}))``
