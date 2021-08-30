import { PODCAST_UPDATE_CURRENT_EPISODE } from 'store/actions/episode';
import { EPISODE_ORIGIN } from 'utilities/constants';

const initialState = {
  id: '',
  slug: '',
  title: '',
  description: '',
  imageUrl: '',
  contentType: '',
  publishedPath: '',
  origin: EPISODE_ORIGIN.default,
  episodeType: '',
  show: {
    id: '',
    slug: '',
    name: '',
    playlistCategories: [],
    categories: [],
  },
};

export default function episode(state = initialState, action) {
  switch (action.type) {
    case PODCAST_UPDATE_CURRENT_EPISODE:
      return {
        ...state,
        ...action.episode,
      };
    default:
      return state;
  }
}
