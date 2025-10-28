// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const withNativewind = require('nativewind/metro'); // ✅ default export is a function

module.exports = withNativewind(getDefaultConfig(__dirname), {
  input: './src/global.css', // or './global.css' if that’s where your file lives
});
