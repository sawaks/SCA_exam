// Many thanks: https://stackoverflow.com/questions/9682709/regexp-matching-hex-color-syntax-and-shorten-form
const hexRegex = RegExp(/^#(?:[0-9a-f]{3}){1,2}$/i);

/**
 * This function will convert a supplied hex color and opacity value to a
 * rgba-style color.
 *
 * @param {String} hexColor
 * @param {*} opacity
 * @returns {String}
 */
function rgba(hexColor = '#ffffff', opacity) {
  // Check if the supplied hex color is valid
  if (!hexRegex.test(hexColor)) {
    throw new Error('Please supply a valid hex color');
  }

  // Strip any hashes from the string
  hexColor = hexColor.replace('#', '');

  // Read the individual colors
  const color = {
    red: hexColor.length === 6 ? hexColor.slice(0, 2) : hexColor.slice(0, 1),
    green: hexColor.length === 6 ? hexColor.slice(2, 4) : hexColor.slice(1, 2),
    blue: hexColor.length === 6 ? hexColor.slice(4, 6) : hexColor.slice(2, 3),
  };

  // Parse the colors
  Object.keys(color).forEach((key) => {
    color[key] = parseInt(color[key], 16);
  });

  return `rgba(${color.red},${color.green},${color.blue},${opacity})`;
}

export default rgba;
