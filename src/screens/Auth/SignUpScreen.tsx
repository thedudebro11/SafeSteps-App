import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
export default function SignUpScreen({ navigation }: any) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const onSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return Alert.alert('Error', error.message);
    Alert.alert('Check your email', 'Confirm your account then sign in.');
    navigation.navigate('SignIn');
  };
  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold mb-2">Create account</Text>
      <Text className="text-neutral-500 mb-6">Start using SafeSteps</Text>
      <TextInput className="border border-neutral-300 rounded-2xl px-4 py-3 mb-3" placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput className="border border-neutral-300 rounded-2xl px-4 py-3 mb-6" placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity onPress={onSignUp} className="bg-brand rounded-2xl py-3 items-center"><Text className="text-white font-semibold">Sign Up</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')} className="mt-4 items-center"><Text className="text-brand">I already have an account</Text></TouchableOpacity>
    </View>
  );
}
