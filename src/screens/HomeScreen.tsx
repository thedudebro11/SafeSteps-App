import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import MapView from 'react-native-maps';
import TopBar from '../components/TopBar';
import EmergencyButton from '../components/EmergencyButton';
import { useBackgroundLocation } from '../hooks/useBackgroundLocation';
import { useEmergency } from '../hooks/useEmergency';

export default function HomeScreen() {
  const { start, stop } = useBackgroundLocation();
  const { active: emergencyActive, begin, end } = useEmergency();
  const [tracking, setTracking] = React.useState(false);
  const [frequency, setFrequency] = React.useState(60);

  const onToggleTracking = async () => {
    try {
      if (!tracking) { await start(frequency, false); setTracking(true); }
      else { await stop(); setTracking(false); }
    } catch (e: any) { Alert.alert('Tracking error', e.message || 'Failed to toggle tracking'); }
  };

  const onEmergencyPress = async () => {
    try { if (emergencyActive) await end(); else await begin(); }
    catch (e: any) { Alert.alert('Emergency error', e.message || 'Failed to toggle emergency'); }
  };

  return (
    <View className="flex-1 bg-white">
      <TopBar onEmergencyPress={onEmergencyPress} trackingLabel={emergencyActive ? 'EMERGENCY' : tracking ? `Active • ${frequency}s` : 'Inactive'} />
      <MapView style={{ flex: 1 }} initialRegion={{ latitude: 32.2226, longitude: -110.9747, latitudeDelta: 0.05, longitudeDelta: 0.05 }} />
      <View className="px-4 py-3 border-t border-neutral-200 bg-white">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity className="px-4 py-3 rounded-2xl bg-neutral-100" onPress={() => setFrequency(30)}>
            <Text className={`${frequency===30?'text-brand':'text-neutral-700'} font-semibold`}>30s</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-3 rounded-2xl bg-neutral-100" onPress={() => setFrequency(60)}>
            <Text className={`${frequency===60?'text-brand':'text-neutral-700'} font-semibold`}>1m</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-3 rounded-2xl bg-neutral-100" onPress={() => setFrequency(300)}>
            <Text className={`${frequency===300?'text-brand':'text-neutral-700'} font-semibold`}>5m</Text>
          </TouchableOpacity>
          <TouchableOpacity className={`px-4 py-3 rounded-2xl ${tracking ? 'bg-red-50' : 'bg-brand'}`} onPress={onToggleTracking}>
            <Text className={`${tracking ? 'text-red-600' : 'text-white'} font-semibold`}>{tracking ? 'Stop' : 'Start'}</Text>
          </TouchableOpacity>
        </View>
        <EmergencyButton active={emergencyActive} onPress={onEmergencyPress} />
      </View>
    </View>
  );
}
