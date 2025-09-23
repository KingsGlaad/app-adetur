const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Configuração mínima para resolver problemas com Prisma
config.resolver.alias = {
  ...config.resolver.alias,
  buffer: "buffer",
  process: "process/browser",
  util: "util",
  events: "events",
};

// Desabilitar módulos problemáticos do Node.js
config.resolver.blockList = [
  /node_modules\/stream/,
  /node_modules\/fs/,
  /node_modules\/net/,
  /node_modules\/tls/,
  /node_modules\/crypto/,
  /node_modules\/cipher-base/,
  /node_modules\/hash-base/,
  /node_modules\/pbkdf2/,
];

config.resolver.platforms = ["native", "android", "ios", "web"];

module.exports = withNativeWind(config, { input: "./src/global.css" });
