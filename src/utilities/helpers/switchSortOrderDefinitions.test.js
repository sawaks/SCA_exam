import sortOrderKeyToValue from './switchSortOrderDefinitions';

const mockData = {
  EPISODES_SORT_KEY: {
    latest: 'latest',
    oldest: 'oldest',
    downloaded: 'downloaded',
    unplayed: 'unplayed',
  },
  EPISODES_SORT_ORDER: {
    ASC: 'asc',
    DESC: 'desc',
  },
};

describe('get the corresponding value from the sort order key', () => {
  test('should get "desc" for the sortOrderKey "latest"', () => {
    const result = sortOrderKeyToValue(mockData.EPISODES_SORT_KEY.latest); // 'latest'
    expect(result).toBe(mockData.EPISODES_SORT_ORDER.DESC); // 'desc'
  });
  test('should get "asc" for the sortOrderKey "oldest"', () => {
    const result = sortOrderKeyToValue(mockData.EPISODES_SORT_KEY.oldest); // 'oldest'
    expect(result).toBe(mockData.EPISODES_SORT_ORDER.ASC); // 'asc'
  });
  test('should get "desc" for the sortOrderKey "downloaded"', () => {
    const result = sortOrderKeyToValue(mockData.EPISODES_SORT_KEY.downloaded); // 'downloaded'
    expect(result).toBe(mockData.EPISODES_SORT_ORDER.DESC); // 'desc'
  });
  test('should get "desc" for the sortOrderKey "unplayed"', () => {
    const result = sortOrderKeyToValue(mockData.EPISODES_SORT_KEY.unplayed); // 'unplayed'
    expect(result).toBe(mockData.EPISODES_SORT_ORDER.DESC); // 'desc'
  });
  test('should get null for the sortOrderKey null or except any other keys mentioned above', () => {
    const result = sortOrderKeyToValue(null);
    expect(result).toBe(null);
  });
});
