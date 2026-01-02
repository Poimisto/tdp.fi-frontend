// src/createEmotionCache.js
const createCache = require("@emotion/cache").default
module.exports = function createEmotionCache() {
  let insertionPoint

  if (typeof document !== "undefined") {
    insertionPoint = document.querySelector(
      'meta[name="emotion-insertion-point"]'
    )
  }

  // like MUI v4's injectFirst: ensures MUI styles load before others
  return createCache({ key: "mui", insertionPoint })
}
