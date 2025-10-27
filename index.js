// index.js
import 'react-native-gesture-handler';
import 'react-native-reanimated'; // OK as a side-effect import
import 'expo-dev-client';

import { registerRootComponent } from 'expo';
import App from './src/App';
registerRootComponent(App);
