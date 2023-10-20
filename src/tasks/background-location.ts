import { Accuracy, startLocationUpdatesAsync } from 'expo-location'
import { defineTask } from 'expo-task-manager'

export const BACKGROUND_TASK_NAME = 'location-tracking'

defineTask<any>(BACKGROUND_TASK_NAME, ({ data, error }) => {
  try {
    if (error) throw error

    const { coords, timestamp } = data.locations[0]

    const currentLocation = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      timestamp,
    }

    console.log(currentLocation)
  } catch (error) {
    console.log(error)
  }
})

export async function startLocationTask() {
  try {
    await startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
      accuracy: Accuracy.Highest,
      distanceInterval: 1,
      timeInterval: 1000,
    })
  } catch (error) {
    console.log(error)
  }
}
