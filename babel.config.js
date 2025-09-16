module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // TS path aliases (matches your tsconfig)
      ['module-resolver', {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
        alias: { '@': './src', '@ui': './src/ui' },
      }],

      // If you use these packages, leave them; otherwise they’re harmless
      'nativewind/babel',
      

      // Reanimated must be last
      'react-native-reanimated/plugin',
    ],
  };
};
