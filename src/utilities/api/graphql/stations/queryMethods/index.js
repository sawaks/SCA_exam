/* eslint-disable import/prefer-default-export */
import {
  GET_STATIONS_BY_SLUG,
  GET_STATION_BY_SLUG,
  GET_RELATED_STATIONS_BY_SLUG,
  GET_PROMOTED_STATIONS,
  GET_ONBOARDING_STATIONS,
  GET_ONBOARDING_FAVOURITE_STATIONS,
  GET_ALL_STATIONS,
} from 'utilities/api/graphql/stations/queries';

import fetchAPI from '../../index';

export async function getStationBySlug(slug) {
  try {
    return await fetchAPI(GET_STATION_BY_SLUG, {
      slug,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getStationBySlug');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

export async function getStations(slugs) {
  try {
    return await fetchAPI(GET_STATIONS_BY_SLUG, { slugs });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getStations');
    // eslint-disable-nex
    return error;
  }
}

export async function getAllStations() {
  try {
    return await fetchAPI(GET_ALL_STATIONS);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getAllStations');
    // eslint-disable-nex
    return error;
  }
}

export async function getRelatedStationsBySlug(slug) {
  try {
    return await fetchAPI(GET_RELATED_STATIONS_BY_SLUG, {
      slug,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getRelatedStationBySlug');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

export async function getPromotedStations() {
  try {
    return await fetchAPI(GET_PROMOTED_STATIONS);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getPromotedStations');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

export async function getOnboardStations(genreSlugs) {
  try {
    return await fetchAPI(GET_ONBOARDING_STATIONS, {
      genreSlugs,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getOnboardStations');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

export async function getOnboardFavStations(postcode, slugs) {
  try {
    const { onboardFavouriteStations } = await fetchAPI(GET_ONBOARDING_FAVOURITE_STATIONS, {
      postcode,
      slugs,
    });

    return onboardFavouriteStations.map(item => ({
      ...item,
      createDate: new Date().toISOString(),
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getOnboardFavStations');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}
