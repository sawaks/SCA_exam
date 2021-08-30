import recentPlayedSelector from './index';

describe('Recent episodes played selector', () => {
  let profile;
  beforeEach(() => {
    profile = {
      '0ea3e9f1-6350-4919-895b-abfd007a7665': {
        id: '0ea3e9f1-6350-4919-895b-abfd007a7665',
        progress: 0.0014359627565948966,
      },
      '2f094d30-5fe3-4dd1-9dac-aa4c003fa750': {
        id: '2f094d30-5fe3-4dd1-9dac-aa4c003fa750',
        progress: 0.0014359627565948966,
      },
      '38395c2b-588c-42a0-b7ea-aa4c003fc32f': {
        id: '38395c2b-588c-42a0-b7ea-aa4c003fc32f',
        progress: 0.0014359627565948966,
      },
      '3cf0deda-a665-438c-a9ec-aa4c0042d86d': {
        id: '3cf0deda-a665-438c-a9ec-aa4c0042d86d',
        progress: 0.0014359627565948966,
      },
      '51e06331-291b-4816-83d0-aa4c003fac69': {
        id: '51e06331-291b-4816-83d0-aa4c003fac69',
        progress: 0.0014359627565948966,
      },
      '69be03c4-f33a-4c6b-9fe8-aa4c003fe75f': {
        id: '69be03c4-f33a-4c6b-9fe8-aa4c003fe75f',
        progress: 0.0014359627565948966,
      },
      '6ddb1b1e-5988-493d-b0d9-aa4c003fac7c': {
        id: '6ddb1b1e-5988-493d-b0d9-aa4c003fac7c',
        progress: 0.0014359627565948966,
      },
      '6ee2e4c9-aa85-4939-a67b-aa4c003fd01a': {
        id: '6ee2e4c9-aa85-4939-a67b-aa4c003fd01a',
        progress: 0.0014359627565948966,
      },
    };
  });

  const episodeMock = {
    episode: {
      id: 'd995e6c1-5056-4dbc-9c71-ac6e006ddba9',
      show: {
        episodes: {
          totalItems: 57,
        },
      },
    },
  };

  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      data: episodeMock,
    }),
  })
  );

  test('it should get the most recent 6 episodes', async () => {
    const shows = await recentPlayedSelector(profile);
    expect(shows.length).toBe(6);
  });
});
