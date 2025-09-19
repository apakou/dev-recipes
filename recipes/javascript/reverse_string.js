/**
 * Reverse a given string.
 *
 * @param {string} str The string to reverse.
 * @returns {string} The reversed string.
 *
 * @example
 * reverseString('hello'); // 'olleh'
 * reverseString('world'); // 'dlrow'
 */
function reverseString(str) {
  return str.split('').reverse().join('');
}