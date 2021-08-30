import fetchAPI from '../..';
import { FAQ } from '../queries';

export default async function getFAQs() {
  try {
    return await fetchAPI(FAQ);
  } catch (error) {
    return error;
  }
}
