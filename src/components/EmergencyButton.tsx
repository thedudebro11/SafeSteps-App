import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
type Props = { active: boolean; onPress: () => void; };
export default function EmergencyButton({ active, onPress }: Props) {
  return (
    <View className="items-center my-4">
      <TouchableOpacity onPress={onPress} className={`w-48 h-48 rounded-full items-center justify-center ${active ? 'bg-red-700' : 'bg-red-600'} shadow-lg`}>
        <Text className="text-white font-bold text-lg">{active ? 'END' : 'EMERGENCY'}</Text>
      </TouchableOpacity>
      <Text className="mt-2 text-neutral-500 text-sm">{active ? 'Emergency active — tap to stop' : 'Tap to start emergency'}</Text>
    </View>
  );
}
