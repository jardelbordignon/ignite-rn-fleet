import {
  Accuracy,
  startLocationUpdatesAsync,
  hasStartedLocationUpdatesAsync,
  stopLocationUpdatesAsync,
} from 'expo-location'
import { defineTask } from 'expo-task-manager'

import {
  removeStorageLocations,
  saveStorageLocation,
} from 'src/libs/storage/location'

export const BACKGROUND_TASK_NAME = 'location-tracking'

type Location = {
  coords: {
    altitude: number
    altitudeAccuracy: number
    latitude: number
    accuracy: number
    longitude: number
    heading: number
    speed: number
  }
  timestamp: number
}

type Data = {
  locations: Location[]
}

defineTask<Data>(BACKGROUND_TASK_NAME, async ({ data, error }) => {
  try {
    if (error) throw error
    if (!data) return

    const { coords, timestamp } = data.locations[0]

    const currentLocation = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      timestamp,
    }

    saveStorageLocation(currentLocation)
  } catch (error) {
    console.log(error)
    stoptLocationTask()
  }
})

export async function stoptLocationTask() {
  try {
    const hasStarted = await hasStartedLocationUpdatesAsync(BACKGROUND_TASK_NAME)

    if (hasStarted) {
      await stopLocationUpdatesAsync(BACKGROUND_TASK_NAME)
      removeStorageLocations()
    }
  } catch (error) {
    console.log(error)
  }
}

export async function startLocationTask() {
  try {
    await stoptLocationTask()
    await startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
      accuracy: Accuracy.Highest,
      distanceInterval: 1,
      timeInterval: 1000,
    })
  } catch (error) {
    console.log(error)
  }
}
