import { createSelector } from 'reselect';

const playlistSelector = myPlaylist => myPlaylist;

const sortMyPlaylistSelector = createSelector(
  playlistSelector,
  (myPlaylist) => {
    if (!myPlaylist) {
      return {};
    }
    return Object.keys(myPlaylist).sort((a, b) => myPlaylist[a].order - myPlaylist[b].order);
  }
);

export default sortMyPlaylistSelector;
