import { GET_CATEGORY_BASED_CAROUSELS, GET_CATEGORIES } from '../queries';
import fetchAPI from '../..';

export async function getPromotedCategories() {
  try {
    return await fetchAPI(GET_CATEGORY_BASED_CAROUSELS);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getPromotedCategories', error);
    throw error;
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
    console.log('ERROR => getCategories', error);
    throw error;
  }
}
