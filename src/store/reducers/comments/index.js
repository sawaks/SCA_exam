import {
  COMMENTS_RETRIEVE_COMMENT_BY_EPISODE,
  COMMENTS_UPDATE_ACTIVE_COMMENT,
  COMMENTS_SET_ACTIVE_COMMENT,
  COMMENTS_CLEAR_ACTIVE_COMMENT,
} from 'store/actions/comments';

const initialState = {
  comments: {},
  initialCommentsRetrieved: false,
  activeComment: null,
};

export default function comments(state = initialState, action) {
  switch (action.type) {
    case COMMENTS_RETRIEVE_COMMENT_BY_EPISODE: {
      return {
        ...state,
        comments: {
          ...action.payload,
        },
        initialCommentsRetrieved: true,
      };
    }
    case COMMENTS_UPDATE_ACTIVE_COMMENT: {
      return {
        ...state,
        activeComment: {
          ...state.activeComment,
          ...action.payload,
        },
      };
    }
    case COMMENTS_SET_ACTIVE_COMMENT: {
      return {
        ...state,
        activeComment: action.payload,
      };
    }
    case COMMENTS_CLEAR_ACTIVE_COMMENT: {
      return {
        ...state,
        activeComment: null,
      };
    }
    default:
      return state;
  }
}

