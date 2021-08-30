import sortMyPlaylistSelector from './index';

describe('Recent episodes played selector', () => {
  let myPlaylistState;
  beforeEach(() => {
    myPlaylistState = {
      '96a824a3-6c73-43b3-add1-aada006230b4': {
        episodeId: '96a824a3-6c73-43b3-add1-aada006230b4',
        order: 1,
        savedDateTime: '2019-11-15T00:43:37Z',
      },
      'c71718c9-a183-4db2-98cf-aaed005275dd': {
        episodeId: 'c71718c9-a183-4db2-98cf-aaed005275dd',
        order: 3,
        savedDateTime: '2019-11-15T00:30:27Z',
      },
      'e4a18c3d-5133-41bd-86f6-aada0063ad48': {
        episodeId: 'e4a18c3d-5133-41bd-86f6-aada0063ad48',
        order: 2,
        savedDateTime: '2019-11-18T03:45:35Z',
      },
      'f12dacc0-007f-40d6-9bd9-ab0400477cec': {
        episodeId: 'f12dacc0-007f-40d6-9bd9-ab0400477cec',
        order: 0,
        savedDateTime: '2019-11-18T03:45:27Z',
      },
    };
  });

  test('it should get the most recent 6 episodes', () => {
    const myPlaylist = sortMyPlaylistSelector(myPlaylistState);
    expect(myPlaylist[0])
      .toBe('f12dacc0-007f-40d6-9bd9-ab0400477cec');
    expect(myPlaylist[1])
      .toBe('96a824a3-6c73-43b3-add1-aada006230b4');
    expect(myPlaylist[2])
      .toBe('e4a18c3d-5133-41bd-86f6-aada0063ad48');
    expect(myPlaylist[3])
      .toBe('c71718c9-a183-4db2-98cf-aaed005275dd');
  });
});
