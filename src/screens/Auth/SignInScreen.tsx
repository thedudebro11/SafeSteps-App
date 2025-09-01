import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const onSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert('Error', error.message);
  };
  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold mb-2">Welcome back</Text>
      <Text className="text-neutral-500 mb-6">Sign in to continue</Text>
      <TextInput className="border border-neutral-300 rounded-2xl px-4 py-3 mb-3" placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput className="border border-neutral-300 rounded-2xl px-4 py-3 mb-6" placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity onPress={onSignIn} className="bg-brand rounded-2xl py-3 items-center"><Text className="text-white font-semibold">Sign In</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className="mt-4 items-center"><Text className="text-brand">Create an account</Text></TouchableOpacity>
    </View>
  );
}
