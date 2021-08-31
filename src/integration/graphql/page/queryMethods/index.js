/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { GET_PAGE } from '../queries';
import fetchAPI from '../..';

export async function getPage(slug) {
  try {
    return await fetchAPI(GET_PAGE, { slug });
  } catch (error) {
    console.log('ERROR => getPage', error);
    throw error;
  }
}
