import { createSelectorCreator, defaultMemoize } from 'reselect';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
import { getOneEpisode } from 'utilities/api/graphql/episodes/queryMethods';
import Logger from 'utilities/helpers/logger';
import episodeComplete from 'utilities/helpers/episodeComplete';

function objectToArray(episodes) {
  return Object.keys(episodes)
    .map(key => (
      episodes[key]
    ));
}

function unfinished(episodes) {
  return episodes.filter(a => !a.completed && !a.isMarkedAsPlayed && !episodeComplete(a.playheadPosition, a.durationSeconds));
}

function sortEpisodesByDate(episodes) {
  return episodes.sort((a, b) => {
    if (a.playedDateTime && b.playedDateTime) {
      return moment(a.playedDateTime).isAfter(b.playedDateTime) ? -1 : 1;
    }
    return -1;
  });
}

async function getTop6(episodes) {
  const sortedEpisodes = sortEpisodesByDate(unfinished(objectToArray(episodes)));
  // console.log(sortedEpisodes);
  try {
    const episodeData = Promise.all(sortedEpisodes.map(async (data) => {
      const { episode } = await getOneEpisode(data.id);
      const totalEpisodes = episode?.show?.episodes?.totalItems;
      data.totalEpisodes = totalEpisodes;
      const mergedEpisodes = { ...data, ...episode };
      return mergedEpisodes;
    }));
    const result = await episodeData;
    const validEpisodes = result.filter(item => item.totalEpisodes > 1 && item.progress < 1);
    return validEpisodes.slice(0, 6);
  } catch (error) {
    Logger.error(error);
    return null;
  }
}

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual,
);

const recentPlayedSelector = createDeepEqualSelector(
  allEpisodes => allEpisodes,
  episodes => getTop6(episodes),
);

export default recentPlayedSelector;
