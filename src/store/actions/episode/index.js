import * as player from 'components/Player/AudioPlayer/player';
import { getOneEpisode } from 'utilities/api/graphql/episodes/queryMethods';
import { EPISODE_ORIGIN } from 'utilities/constants';
import { decrypt, encrypt } from '../../../utilities/helpers/audioObsfucator';

export const PODCAST_UPDATE_CURRENT_EPISODE = 'PODCAST_UPDATE_CURRENT_EPISODE';

export const updateShowEpisode = episode => ({
  type: PODCAST_UPDATE_CURRENT_EPISODE,
  episode,
});

/**
 * @method updateCurrentEpisode
 * @description Takes a episode object, sets it as the current
 * playing episode and starts the audio
 * @param {string} episodeId
 * @param {number} playheadPosition
 * @param {string} playlistSlug
 * @param {string} origin
 * @returns
 */
export function updateCurrentEpisode(episodeId, playheadPosition = 0, playlistSlug, origin = EPISODE_ORIGIN.default) {
  return async (dispatch, getState) => {
    // Fetches the selected episode
    const { episode } = await getOneEpisode(episodeId);
    episode.audioUrl = encrypt(episode.audioUrl);
    episode.show.seasons = episode?.show?.seasons.map(item => item.season);
    const showId = episode.show.id;
    const contentType = episode?.show?.contentType;
    const { userSessionInfo } = getState();
    const showSeasons = userSessionInfo?.shows?.[showId]?.availableSeasons;

    let previousSeason = null;
    let nextSeason = null;

    if (showSeasons) {
      const currentSeasonIndex = showSeasons.findIndex(item => item === episode.season);
      // calculate if there is a previous season.
      previousSeason = currentSeasonIndex === 0 ? null : showSeasons[currentSeasonIndex - 1];
      // calculate if there is a next season.
      nextSeason = currentSeasonIndex === showSeasons.length - 1 ? null : showSeasons[currentSeasonIndex + 1];
    }

    dispatch(updateShowEpisode({
      ...episode,
      playlistSlug,
      origin,
      contentType,
      playheadPosition,
      ...(nextSeason && { nextSeason }),
      ...(previousSeason && { previousSeason }),
    }));
    player.updateSource(decrypt(episode.audioUrl), episodeId, playheadPosition);
    return episode;
  };
}
