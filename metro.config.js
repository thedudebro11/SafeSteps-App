// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Point to your Tailwind entry file
module.exports = withNativeWind(config, { input: './src/styles/global.css' });
