// MUST be first for React Native Gesture Handler
import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';

// If your app code lives in /src, use those paths (or your TS alias '@')
import { queryClient } from '@/state/queryClient';               // or './src/state/queryClient'
import RootNavigator from '@/navigation/RootNavigator';          // or './src/navigation/RootNavigator'
import { registerBackgroundTask } from '@/tasks/locationTask';   // or './src/tasks/locationTask'

// ❌ Remove CSS import (no css-interop now)
// import './src/styles/global.css';

// ❌ Usually not needed; remove unless it exports something required
// import './styles/tailwind';

export default function App() {
  useEffect(() => {
    // safer than running at import time
    registerBackgroundTask?.();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <RootNavigator />
          <StatusBar style="dark" />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
