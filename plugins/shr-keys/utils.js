/*
 * Convert hex string to a byte array
 * @param {hex} hex string
 * @return {array} a byte array
 */
function hexToBytes(hex) {
  let c = null
  let bytes = null
  for (bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16))
  return bytes
}

/*
 * Convert a byte array to hex string
 * @param {bytes} a byte array
 * @return {string} a hex string
 */
function bytesToHex(bytes) {
  let hex = null
  let i = null
  for (hex = [], i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16))
    hex.push((bytes[i] & 0xf).toString(16))
  }
  return hex.join('')
}

/*
 * Remove 0x prefix if presents
 * @param {string} a hex string prefixed with 0x or not
 * @return {string} a hex string without 0x
 */
function cleanHex(str) {
  if (str.startsWith('0x')) return str.slice(2)
  else return str
}

export default {
  hexToBytes,
  bytesToHex,
  cleanHex
}
