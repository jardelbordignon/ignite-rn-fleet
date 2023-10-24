import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

const STORAGE_KEY = '@ignitefleet:locations'

type LocationProps = {
  latitude: number
  longitude: number
  timestamp: number
}

export function getStorageLocations() {
  const locations = storage.getString(STORAGE_KEY)
  return locations ? (JSON.parse(locations) as LocationProps[]) : []
}

export function saveStorageLocation(location: LocationProps) {
  const locations = getStorageLocations()
  const lastLocation = locations[locations.length - 1]
  if (lastLocation === location) return
  locations.push(location)
  storage.set(STORAGE_KEY, JSON.stringify(locations))
}

export function removeStorageLocations() {
  storage.delete(STORAGE_KEY)
}
