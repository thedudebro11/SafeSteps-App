import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createShareLink, listShareLinks, revokeShareLink } from '../lib/api';
export default function ShareScreen() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['shares'], queryFn: listShareLinks });
  const createMut = useMutation({
    mutationFn: () => createShareLink({
      scope: 'history',
      expires_at: new Date(Date.now() + 86_400_000).toISOString(),
      time_window_start: new Date(Date.now() - 86_400_000).toISOString(),
      time_window_end: new Date().toISOString(),
      mask_precision_meters: 100,
    }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['shares'] }),
  });
  const revokeMut = useMutation({ mutationFn: (id: string) => revokeShareLink(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['shares'] }) });
  return (
    <View className="flex-1 bg-white px-4 py-3">
      <Text className="text-2xl font-bold mb-3">Share Links</Text>
      <TouchableOpacity onPress={() => createMut.mutate()} className="bg-brand rounded-2xl py-3 items-center mb-3">
        <Text className="text-white font-semibold">Create 24h History Link</Text>
      </TouchableOpacity>
      {isLoading && <Text>Loading…</Text>}
      <FlatList
        data={data?.links || []}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <View className="py-3 border-b border-neutral-200">
            <Text className="font-semibold">{item.scope.toUpperCase()} • Expires {new Date(item.expires_at).toLocaleString()}</Text>
            {item.url ? <Text className="text-neutral-500 text-xs">{item.url}</Text> : null}
            <View className="flex-row gap-3 mt-2">
              <TouchableOpacity onPress={() => revokeMut.mutate(item.id)} className="px-3 py-2 rounded-2xl bg-red-50">
                <Text className="text-red-600">Revoke</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text className="text-neutral-500">No active links.</Text>}
      />
    </View>
  );
}
