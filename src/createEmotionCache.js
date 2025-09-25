// src/createEmotionCache.js
const createCache = require("@emotion/cache").default;
module.exports = function createEmotionCache() {
  // like MUI v4's injectFirst: ensures MUI styles load before others
  return createCache({ key: "css", prepend: true });
};
