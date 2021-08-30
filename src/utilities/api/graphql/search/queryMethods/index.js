import { GET_AUTOCOMPLETE, SEARCH } from '../queries';
import fetchAPI from '../../index';

export async function getAutoComplete(term) {
  try {
    return await fetchAPI(GET_AUTOCOMPLETE, { term });
  } catch (error) {
    return error;
  }
}

export async function getSearchResults(term) {
  try {
    return await fetchAPI(SEARCH, { term });
  } catch (error) {
    return error;
  }
}
