import React from 'react';
import { View, Text } from 'react-native';
export default function StatusChip({ label }: { label: string }) {
  return (
    <View className="px-2 py-1 bg-neutral-100 rounded-full">
      <Text className="text-neutral-700 text-xs">{label}</Text>
    </View>
  );
}
