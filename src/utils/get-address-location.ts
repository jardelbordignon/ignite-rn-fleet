import { reverseGeocodeAsync } from 'expo-location'

type Props = {
  latitude: number
  longitude: number
}

export async function getAddressLocation(coords: Props) {
  try {
    const addressData = await reverseGeocodeAsync(coords)
    return addressData[0]
  } catch (error) {
    console.log(error)
  }
}
