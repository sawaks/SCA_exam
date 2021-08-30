/**
 * @method getEpisodeInfo
 * @description Format episode Season and Number for EpisodeItem Components
 * @param {object} episode
 * @returns {string} S.1 | Ep.2
 */

export default function getEpisodeInfo(episode) {
  if (episode.episode) {
    return `S.${episode.season}  |  Ep.${episode.episode}`;
  }
  return `S.${episode.season}`;
}
