/**
 * Formats strings to be used as keys for list items in JSX.
 *
 * Makes all characters lower-case, replaces whitespace with dashes (-) and
 * removes non-alphanumeric characters.
 * @param {string} str
 * @returns {string} Formatted string
 */
const formatListKey = str =>
  str
    .toLowerCase()
    .replaceAll(/\s/g, "-")
    .replaceAll(/[^a-z0-9\s]/g, "")

export default formatListKey
