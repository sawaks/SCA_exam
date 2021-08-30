import firebase from 'firebase/app';
import 'firebase/firestore';

const EPISODES_COLLECTION = 'episodes';
const COMMENTS_COLLECTION = 'comments';

const statusLevels = {
  hidden: 5,
  reported: 4,
  censored: 3,
  deleted: 2,
  visible: 1,
};

export function addComment(episodeId, payload) {
  // Establish post id
  let postObject;
  // Generated a new id from Firestore
  const ref = firebase.firestore().collection(COMMENTS_COLLECTION).doc();
  if (payload.postId) {
    postObject = {
      postId: payload.postId,
      postCreated: payload.postCreated,
      commentId: ref.id,
      level: 2,
      ...(payload.replyTo && { replyTo: payload.replyTo }),
    };
  } else {
    postObject = {
      postId: ref.id,
      commentId: ref.id,
      postCreated: Date.now(),
      level: 1,
    };
  }

  // Set the status level based on whether the comment has being censored.
  const modStatusLevel = payload.isCensored ? statusLevels.censored : statusLevels.visible;

  // Firebase payload
  const firebasePayload = {
    ...payload,
    ...postObject,
    commentCreated: Date.now(),
    modTotal: 0,
    modHarassmentCount: 0,
    modSpamCount: 0,
    modExplicitCount: 0,
    modHateSpeechCount: 0,
    modReported: false,
    modHidden: false,
    modDeleted: false,
    modReviewBy: null,
    modReportedBy: [],
    modStatusLevel,
    descendants: 0,
  };

  // Firebase Refs
  const newCommentRef = firebase.firestore()
    .collection(EPISODES_COLLECTION)
    .doc(episodeId)
    .collection(COMMENTS_COLLECTION)
    .doc(postObject.commentId);

  // If new comment is a descendants of another comment update the descendants value in the parent.
  if (payload.postId) {
    const commentPostRef = firebase.firestore()
      .collection(EPISODES_COLLECTION)
      .doc(episodeId)
      .collection(COMMENTS_COLLECTION)
      .doc(postObject.postId);

    return firebase.firestore()
      .runTransaction(transaction => transaction.get(commentPostRef).then((comment) => {
        if (!comment.exists) {
          throw new Error('Document does not exist!');
        }
        // Increment the descendants field.
        const parentData = comment.data();
        const numberOfDescendants = parentData.descendants ? parentData.descendants + 1 : 1;

        transaction.update(commentPostRef, { descendants: numberOfDescendants });
        transaction.set(newCommentRef, firebasePayload, { merge: true });
      }));
  }
  // If its not a child comment then just add a new entry.
  return newCommentRef.set(firebasePayload, { merge: true });
}

export function markCommentsAsDeleted(deleteComment) {
  const { episodeId, commentId, postId, level } = deleteComment;

  const deleteCommentRef = firebase.firestore()
    .collection(EPISODES_COLLECTION)
    .doc(episodeId)
    .collection(COMMENTS_COLLECTION)
    .doc(commentId);

  // If its a child comment decrease the descendants field count on the parent.
  if (level === 2) {
    const commentPostRef = firebase.firestore()
      .collection(EPISODES_COLLECTION)
      .doc(episodeId)
      .collection(COMMENTS_COLLECTION)
      .doc(postId);

    return firebase.firestore()
      .runTransaction(transaction => transaction.get(commentPostRef).then((comment) => {
        if (!comment.exists) {
          throw new Error('Document does not exist!');
        }
        // Increment the descendants field.
        const parentData = comment.data();
        const numberOfChildren = parentData.descendants > 0 ? parentData.descendants - 1 : 0;

        transaction.update(commentPostRef, { descendants: numberOfChildren });
        transaction.update(deleteCommentRef, { modDeleted: true, modStatusLevel: statusLevels.deleted });
      }));
  }

  return firebase.firestore()
    .collection(EPISODES_COLLECTION)
    .doc(episodeId)
    .collection(COMMENTS_COLLECTION)
    .doc(commentId)
    .update({
      modDeleted: true,
      modStatusLevel: statusLevels.deleted,
    });
}

export function retrieveCommentsByEpisode(episodeId) {
  return firebase.firestore()
    .collection(EPISODES_COLLECTION)
    .doc(episodeId)
    .collection(COMMENTS_COLLECTION)
    .where('modDeleted', '==', false)
    .get();
}

export async function reportComment(episodeId, commentId, type, reporterId) {
  const commentRef = await firebase.firestore()
    .collection(EPISODES_COLLECTION)
    .doc(episodeId)
    .collection(COMMENTS_COLLECTION)
    .doc(commentId);

  return firebase.firestore()
    .runTransaction(transaction => transaction
      .get(commentRef)
      .then((comment) => {
        if (!comment.exists) {
          throw new Error('Document does not exist!');
        }

        const commentData = comment.data();
        const typeCount = commentData[type] ? commentData[type] + 1 : 1;
        const totalCount = commentData.modTotal ? commentData.modTotal + 1 : 1;

        let modHidden = false;
        if ((totalCount > 0)
              || (type === 'modHarassmentCount' && typeCount > 0)
              || (type === 'modSpamCount' && typeCount > 0)
              || (type === 'modExplicitCount' && typeCount > 0)
              || (type === 'modHateSpeechCount' && typeCount > 0)) {
          modHidden = true;
        }

        // Set status level
        const modStatusLevel = modHidden ? statusLevels.hidden : statusLevels.reported;

        transaction.update(commentRef, {
          [type]: typeCount,
          modReported: true,
          modHidden,
          modStatusLevel,
          modTotal: totalCount,
          modReportedBy: firebase.firestore.FieldValue.arrayUnion(reporterId),
        });
      })
    );
}
