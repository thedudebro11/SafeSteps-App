// index.js
import 'react-native-reanimated';          // 1) reanimated FIRST
import 'react-native-gesture-handler';     // 2)
import 'expo-dev-client';                  // 3)

import { registerRootComponent } from 'expo';
import App from './src/App';
registerRootComponent(App);
