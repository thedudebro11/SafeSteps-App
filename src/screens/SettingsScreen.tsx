import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';
import { meLimits } from '../lib/api';
export default function SettingsScreen() {
  const [limits, setLimits] = React.useState<any>(null);
  React.useEffect(() => { meLimits().then(setLimits).catch(() => {}); }, []);
  const onSignOut = async () => { await supabase.auth.signOut(); };
  return (
    <View className="flex-1 bg-white px-4 py-3">
      <Text className="text-2xl font-bold mb-3">Settings</Text>
      {limits && (
        <View className="mb-4">
          <Text className="font-semibold">Plan: {limits.plan_tier}</Text>
          <Text className="text-neutral-600 text-sm">History Days: {limits.history_days}</Text>
          <Text className="text-neutral-600 text-sm">Seats: {limits.seats}</Text>
        </View>
      )}
      <TouchableOpacity className="bg-neutral-100 rounded-2xl py-3 items-center mb-2">
        <Text className="font-semibold">Manage Subscription</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSignOut} className="bg-red-50 rounded-2xl py-3 items-center">
        <Text className="text-red-600 font-semibold">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
