module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
        alias: { '@': './src', '@ui': './src/ui' },
      }],
      // Reanimated must be last
      'react-native-reanimated/plugin',
    ],
  };
};
