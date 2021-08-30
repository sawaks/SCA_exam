import { GET_CATEGORY_BASED_CAROUSELS, GET_PROMOTED_CATEGORIES_SHOWS, GET_ALL_CATEGORIES, GET_CATEGORIES } from '../queries';
import fetchAPI from '../..';

export async function getPromotedCategories() {
  try {
    return await fetchAPI(GET_CATEGORY_BASED_CAROUSELS);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getPromotedCategories');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

export async function getPromotedCategoriesShows() {
  try {
    return await fetchAPI(GET_PROMOTED_CATEGORIES_SHOWS);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getPromotedCategories');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

export async function getAllCategories() {
  try {
    return await fetchAPI(GET_ALL_CATEGORIES);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getAllCategories', error);
    return error;
  }
}

export async function getCategories(arrayOfSlugs, sortingOrder) {
  try {
    return fetchAPI(GET_CATEGORIES, {
      slugs: arrayOfSlugs,
      order: sortingOrder,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getCategories');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}
