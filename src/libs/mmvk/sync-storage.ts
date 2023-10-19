import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

const STORAGE_SYNC_KEY = '@ignitefleet:last_sync'

export function saveLastSyncTimestamp() {
  const timestamp = new Date().getTime()
  storage.set(STORAGE_SYNC_KEY, timestamp.toString())

  return timestamp
}

export function getLastSyncTimestamp() {
  const timestamp = storage.getString(STORAGE_SYNC_KEY)
  if (!timestamp) return undefined
  return +timestamp
}
