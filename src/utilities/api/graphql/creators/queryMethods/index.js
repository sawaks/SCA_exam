import fetchAPI from '../..';
import { GET_CREATOR } from '../queries';

// eslint-disable-next-line import/prefer-default-export
export async function getCreator(slug) {
  try {
    return await fetchAPI(GET_CREATOR, { slug });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getCreator');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}
