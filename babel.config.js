module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Plugin necessário para o Expo Router funcionar corretamente com a
      // navegação baseada em arquivos (Stack e Tabs).
      "expo-router/babel",
    ],
  };
};
