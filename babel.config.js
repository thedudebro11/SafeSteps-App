module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-css-interop/babel",  // 👈 required for className support
      "react-native-reanimated/plugin"   // 👈 keep LAST
    ],
  };
};
