import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
type Props = { onEmergencyPress: () => void; trackingLabel: string; };
export default function TopBar({ onEmergencyPress, trackingLabel }: Props) {
  return (
    <View className="px-4 py-3 flex-row items-center justify-between bg-white border-b border-neutral-200">
      <Text className="text-xl font-semibold">SafeSteps</Text>
      <View className="flex-row items-center gap-3">
        <View className="px-2 py-1 rounded-full bg-blue-100">
          <Text className="text-blue-700 text-xs">{trackingLabel}</Text>
        </View>
        <TouchableOpacity onPress={onEmergencyPress} className="px-3 py-2 rounded-2xl bg-red-600">
          <Text className="text-white font-semibold">EMERGENCY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
