// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
        alias: { '@': './src', '@ui': './src/ui' },
      }],
      // 'nativewind/babel',            // ⛔️ TEMPORARILY COMMENTED OUT
      'react-native-reanimated/plugin', // MUST be last
    ],
  };
};
