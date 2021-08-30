import moment from 'moment';
import { convertDate } from 'utilities/helpers/dateTime';
import episodeComplete from 'utilities/helpers/episodeComplete';

export default function combineWithPersonalisedData(episodes, sessionInfo, lastSeen) {
  return episodes?.map((episode) => {
    const { isMarkedAsPlayed, playheadPosition, durationSeconds } = sessionInfo[episode.id] || {};

    return {
      ...episode,
      info: episode.episode && `Ep ${episode.episode}`,
      publishedDate: convertDate(episode.publishedUtc),
      time: playheadPosition || 0,
      isCompleted: isMarkedAsPlayed || episodeComplete(playheadPosition, durationSeconds),
      isNewEpisode: (lastSeen && moment(episode.publishedUtc).isAfter(lastSeen)) || null,
    };
  });
}

