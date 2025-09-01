import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listFamily, createInvite } from '../lib/api';
export default function FamilyScreen() {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({ queryKey: ['family'], queryFn: listFamily });
  const inviteMut = useMutation({ mutationFn: createInvite, onSuccess: () => qc.invalidateQueries({ queryKey: ['family'] }) });
  const onInvite = async () => { try { await inviteMut.mutateAsync(); } catch (e: any) { Alert.alert('Invite error', e.message); } };
  return (
    <View className="flex-1 bg-white px-4 py-3">
      <Text className="text-2xl font-bold mb-3">Family</Text>
      {isLoading && <Text>Loading…</Text>}
      {error && <Text className="text-red-600">Failed to load</Text>}
      <FlatList
        data={data?.members || []}
        keyExtractor={(item: any) => item.user_id}
        renderItem={({ item }: any) => (
          <View className="flex-row justify-between items-center py-3 border-b border-neutral-200">
            <View>
              <Text className="font-semibold">{item.display_name || item.email}</Text>
              <Text className="text-neutral-500 text-xs">{item.role} • {item.visibility}</Text>
            </View>
            <Text className="text-neutral-400 text-xs">{item.last_seen_at ? new Date(item.last_seen_at).toLocaleString() : '—'}</Text>
          </View>
        )}
        ListEmptyComponent={<Text className="text-neutral-500">No members yet.</Text>}
      />
      <TouchableOpacity onPress={onInvite} className="mt-4 bg-brand rounded-2xl py-3 items-center">
        <Text className="text-white font-semibold">Create Invite Link</Text>
      </TouchableOpacity>
    </View>
  );
}
