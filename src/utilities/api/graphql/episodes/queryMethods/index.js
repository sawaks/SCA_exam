import {
  GET_ONE_EPISODE,
  GET_TRENDING_EPISODES,
  GET_EPISODES_BY_SEASONS,
  GET_EPISODES_BY_SEASONS_AND_ORDER,
  GET_SEASON_FROM_EPISODE_SLUG,
  GET_EPISODE_AND_SHOW_FROM_SEASON } from '../queries';
import fetchAPI from '../..';

export async function getTrendingEpisodes() {
  try {
    return await fetchAPI(GET_TRENDING_EPISODES);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getTrendingEpisodes');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

/**
 * @method getEpisodesBySeasons
 * @description Get episodes based on slug and season
 * @returns {Promise}
 */
export async function getEpisodesBySeasons(slug, season) {
  try {
    return await fetchAPI(GET_EPISODES_BY_SEASONS, {
      slug,
      season,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getEpisodesBySeasons');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

/**
 * @method getEpisodesBySeasonsAndOrder
 * @description Get episodes based on slug, season and order
 * @returns {Promise}
 */
export async function getEpisodesBySeasonsAndOrder(slug, season, order) {
  try {
    return await fetchAPI(GET_EPISODES_BY_SEASONS_AND_ORDER, {
      slug,
      season,
      order,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getEpisodesBySeasonsAndOrder');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

export async function getSeasonFromEpisodeSlug(slug) {
  try {
    return await fetchAPI(GET_SEASON_FROM_EPISODE_SLUG, {
      slug,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getSeasonFromEpisodeSlug');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

export async function getEpisodeAndShowBySeason(slug, season) {
  try {
    return await fetchAPI(GET_EPISODE_AND_SHOW_FROM_SEASON, {
      slug,
      season,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getEpisodeAndShowBySeason');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

/**
 * @method getOneEpisode
 * @description Get episode based on id
 * @returns {Promise}
 */
export async function getOneEpisode(id) {
  return fetchAPI(GET_ONE_EPISODE, { id });
}
