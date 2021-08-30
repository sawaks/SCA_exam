import fetchAPI from '../..';
import { GET_ALL_GENRES, GET_GENRE_BY_SLUG, GET_PROMOTED_GENRES } from '../queries';

// eslint-disable-next-line import/prefer-default-export
export async function getAllGenres() {
  try {
    return await fetchAPI(GET_ALL_GENRES);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getAllGenres');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

export async function getGenreBySlug(arrayOfSlugs, sortingOrder) {
  try {
    return await fetchAPI(GET_GENRE_BY_SLUG, {
      slugs: arrayOfSlugs,
      order: sortingOrder,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getGenreBySlug');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

export async function getPromotedGenres() {
  try {
    return await fetchAPI(GET_PROMOTED_GENRES);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getGenreBySlug');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}
