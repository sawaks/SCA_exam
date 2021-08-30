import { createStore } from 'redux';
import * as actions from 'store/actions/audio-player';
import audioPlayer from './index';

describe('Store', () => {
  const initialState = {
    playing: false,
  };

  const store = createStore(audioPlayer, initialState);

  it('should handle audio playing', () => {
    const action = actions.audioPlay();
    store.dispatch(action);
    const actual = store.getState();

    expect(actual.playing).toBe(true);
  });
});
