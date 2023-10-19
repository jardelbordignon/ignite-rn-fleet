import { reverseGeocodeAsync } from 'expo-location'
import type { LocationObjectCoords } from 'expo-location'

export async function getAddressLocation(coords: LocationObjectCoords) {
  try {
    const addressData = await reverseGeocodeAsync(coords)
    const address = addressData[0]
    if (!address) {
      return
    }
    return address
  } catch (error) {
    console.log(error)
  }
}
