import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
export const LOCATION_TASK = 'LOCATION_TASK';
export function useBackgroundLocation() {
  const start = async (frequencySec: number, emergency: boolean) => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') throw new Error('Location permission denied');
    if (Platform.OS !== 'web') {
      const bg = await Location.requestBackgroundPermissionsAsync();
      if (bg.status !== 'granted') throw new Error('Background location permission denied');
    }
    const accuracy = emergency ? Location.Accuracy.Highest : Location.Accuracy.Balanced;
    const timeInterval = Math.max(5, frequencySec) * 1000;
    await Location.startLocationUpdatesAsync(LOCATION_TASK, {
      accuracy,
      foregroundService: {
        notificationTitle: emergency ? 'Emergency tracking active' : 'SafeSteps tracking',
        notificationBody: emergency ? 'Sharing location every few seconds' : `Sharing every ${frequencySec}s`,
        killServiceOnDestroy: false,
      },
      timeInterval,
      showsBackgroundLocationIndicator: true,
      pausesUpdatesAutomatically: false,
    });
    await Notifications.setNotificationChannelAsync('alerts', { name: 'Alerts', importance: Notifications.AndroidImportance.HIGH });
  };
  const stop = async () => {
    const has = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK);
    if (has) await Location.stopLocationUpdatesAsync(LOCATION_TASK);
  };
  return { start, stop };
}
