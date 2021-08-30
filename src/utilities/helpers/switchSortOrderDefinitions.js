import { EPISODES_SORT_KEY, EPISODES_SORT_OPTIONS } from '../constants';

/**
 * @method sortOrderKeyToValue
 * @description return sort order(asc or desc) depending on the sort order key from 'latest', 'oldest', 'downloaded' or 'unplayed'
 * @param {string} sort order key
 * @returns sort order value either 'asc' or 'desc'
 */

function sortOrderKeyToValue(episodeSortOrderKey) {
  if (EPISODES_SORT_KEY.includes(episodeSortOrderKey)) {
    return EPISODES_SORT_OPTIONS.find(item => item.key === episodeSortOrderKey).value;
  }
  return null;
}

export default sortOrderKeyToValue;
