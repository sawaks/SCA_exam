import fetchAPI from '../..';
import { GET_ABOUT_US } from '../queries';

// eslint-disable-next-line import/prefer-default-export
export async function getAboutUs() {
  try {
    return await fetchAPI(GET_ABOUT_US);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getAboutUs');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}
