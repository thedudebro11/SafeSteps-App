// babel.config.js
/** CLEAN, COMMONJS, NO NESTING */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
        alias: { '@': './src', '@ui': './src/ui' }
      }],
      'nativewind/babel',
      // Reanimated must be last:
      'react-native-reanimated/plugin'
    ],
  };
};
