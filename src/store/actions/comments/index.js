import * as commentApi from 'utilities/api/firebase/comments';
import Logger from 'utilities/helpers/logger';
// import toast from 'utilities/helpers/toast';

export const COMMENTS_ADD_COMMENT_SUCCESS = 'COMMENTS_ADD_COMMENT_SUCCESS';
export const COMMENTS_ADD_COMMENT_ERROR = 'COMMENTS_ADD_COMMENT_ERROR';
export const COMMENTS_RETRIEVE_COMMENT_BY_EPISODE = 'COMMENTS_RETRIEVE_COMMENT_BY_EPISODE';
export const COMMENTS_RETRIEVE_COMMENT_BY_SHOW_ERROR = 'COMMENTS_RETRIEVE_COMMENT_BY_SHOW_ERROR';
export const COMMENTS_REPORT_COMMENT_SUCCESS = 'COMMENTS_REPORT_COMMENT_SUCCESS';
export const COMMENTS_REPORT_COMMENT_ERROR = 'COMMENTS_REPORT_COMMENT_ERRROR';
export const COMMENTS_UPDATE_ACTIVE_COMMENT = 'COMMENTS_UPDATE_ACTIVE_COMMENT';
export const COMMENTS_SET_ACTIVE_COMMENT = 'COMMENTS_SET_ACTIVE_COMMENT';
export const COMMENTS_CLEAR_ACTIVE_COMMENT = 'COMMENTS_CLEAR_ACTIVE_COMMENT';
export const COMMENTS_DELETE_COMMENT_SUCCESS = 'COMMENTS_DELETE_COMMENT_SUCCESS';
export const COMMENTS_DELETE_COMMENT_ERROR = 'COMMENTS_DELETE_COMMENT_ERROR';

export function retrieveCommentsByEpisode(episodeId) {
  return async (dispatch) => {
    try {
      const snapshot = await commentApi.retrieveCommentsByEpisode(episodeId);
      const comments = snapshot.docs.map(doc => doc.data());

      const payload = comments.reduce((acc, item) => {
        acc[item.commentId] = {
          message: item.message,
          replyTo: item.replyTo || null,
          author: item.author,
          authorId: item.authorId,
          postId: item.postId,
          episodeId: item.episodeId,
          commentId: item.commentId,
          commentCreated: item.commentCreated,
          postCreated: item.postCreated,
          hasChildComments: item.hasChildComments,
          level: item.level,
          modTotalCount: item.modTotal,
          modHidden: item.modHidden,
          modDeleted: item.modDeleted,
          modReportedBy: item.modReportedBy,
          descendants: item.descendants,
        };
        return acc;
      }, {});
      dispatch({
        type: COMMENTS_RETRIEVE_COMMENT_BY_EPISODE,
        payload,
      });
    } catch (error) {
      dispatch({
        type: COMMENTS_RETRIEVE_COMMENT_BY_SHOW_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function addComment(episodeId, payload) {
  return async (dispatch) => {
    try {
      await commentApi.addComment(episodeId, payload);
      dispatch({ type: COMMENTS_ADD_COMMENT_SUCCESS });
      return dispatch(retrieveCommentsByEpisode(episodeId));
    } catch (error) {
      dispatch({
        type: COMMENTS_ADD_COMMENT_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function markCommentAsDeleted(comment) {
  return async (dispatch) => {
    try {
      await commentApi.markCommentsAsDeleted(comment);
      dispatch({ type: COMMENTS_DELETE_COMMENT_SUCCESS });
      return dispatch(retrieveCommentsByEpisode(comment.episodeId));
    } catch (error) {
      dispatch({
        type: COMMENTS_DELETE_COMMENT_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function reportComment(episodeId, commentId, reportType, reporterId) {
  return async (dispatch) => {
    try {
      await commentApi.reportComment(episodeId, commentId, reportType, reporterId);
      dispatch({
        type: COMMENTS_REPORT_COMMENT_SUCCESS,
        commentId,
      });
      return dispatch(retrieveCommentsByEpisode(episodeId));
    } catch (error) {
      dispatch({
        type: COMMENTS_REPORT_COMMENT_ERROR,
        error,
      });
      Logger.error(error);
      throw error;
    }
  };
}

export function setActiveComment(payload) {
  return async dispatch => dispatch({
    type: COMMENTS_SET_ACTIVE_COMMENT,
    payload,
  });
}

export function clearActiveComment() {
  return async dispatch => dispatch({
    type: COMMENTS_CLEAR_ACTIVE_COMMENT,
  });
}
