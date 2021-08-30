
function padNumberWithZero(number) {
  if (number > 99) {
    return (number);
  }
  return (`0${number}`).slice(-2);
}

/**
 * @description Format episode Season and Number info
 * @param {number} episodeNumber
 * @param {number} seasonNumber
 * @returns {string} EP00 - S0
 */
export default function getEpisodeNumber(episodeNumber, seasonNumber) {
  if (episodeNumber && seasonNumber) {
    const episode = episodeNumber && `EP${padNumberWithZero(episodeNumber)}`;
    const season = seasonNumber && ` - S${seasonNumber}`;
    return (episode + season).toString();
  }
  return null;
}
