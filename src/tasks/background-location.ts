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
