import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';

const commentsState = state => state.comments.comments;

/**
 * @method groupPostIdSelector
 * @description groups all comments by the post ID.
 * In addition all comments within each post ID is sorted by the date they were created.
 * */

// eslint-disable-next-line import/prefer-default-export
export const groupPostIdSelector = createSelector(
  commentsState,
  (comments) => {
    // Group items
    const groupedByPostId = groupBy(sortBy(comments, 'commentCreated'), 'postId');
    delete groupedByPostId.null; // if a comment has a state of null, a null group is created so we're deleting it.

    return groupedByPostId;
  }
);
