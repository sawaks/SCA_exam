import get from 'lodash/get';
import { getEpisodeAndShowBySeason, getSeasonFromEpisodeSlug } from 'utilities/api/graphql/episodes/queryMethods';

// Need this for trending episodes if the show page has not being loaded yet.
const getAndSaveShowData = async (episodeSlug, showSlug) => {
  const getSeason = await getSeasonFromEpisodeSlug(episodeSlug);
  const season = getSeason?.episode?.season ?? 0;
  const showContents = get(await getEpisodeAndShowBySeason(showSlug, season), 'show', null);
  const episodes = get(showContents, 'episodes.items', null);

  if (showContents) {
    showContents.seasons = showContents.seasons.map((item) => {
      if (item.season === season) {
        return { ...item, episodes };
      }
      return item;
    });
  }
  return showContents;
};

export default getAndSaveShowData;
