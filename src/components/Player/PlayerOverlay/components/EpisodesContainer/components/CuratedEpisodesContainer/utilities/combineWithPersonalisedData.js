import get from 'lodash/get';
import { convertDate } from 'utilities/helpers/dateTime';

export default function getCombinedData(playlist, sessionInfo) {
  const episodes = get(playlist, 'episodes', []);
  return episodes && episodes.map((episode) => {
    let sessionData = false;
    if (sessionInfo && episode.id in sessionInfo) {
      sessionData = true;
    }
    return {
      ...episode,
      playlist,
      time: sessionData ? sessionInfo[episode.id].playheadPosition : 0,
      publishedDate: convertDate(episode.publishedUtc),
      playlistEp: (episode.season ? `S.${episode.season}`
        : '') + (episode.episode && episode.season ? ` | Ep ${episode.episode}`
        : '') + (episode.episode && !episode.season ? `Ep ${episode.episode}`
        : ''),
      playlistDate: convertDate(episode.publishedUtc),
      podcast: {
        id: episode.show.id,
        name: episode.show.name,
        slug: episode.show.slug,
      },
    };
  });
}
