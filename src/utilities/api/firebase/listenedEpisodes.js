import 'firebase/firestore';
import firebase from 'firebase/app';
import isEmpty from 'lodash/isEmpty';
import { LISTENED_EPISODES_COLLECTION, USERS_COLLECTION } from 'utilities/api/firebase/collections';

export function addOrUpdateEpisode(userId, episode) {
  return firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(userId)
    .collection(LISTENED_EPISODES_COLLECTION)
    .doc(episode.id)
    .set(episode, { merge: true });
}

export async function readListenedEpisodes(userId) {
  const episodes = {};
  const episodesSnapshot = await firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(userId)
    .collection(LISTENED_EPISODES_COLLECTION)
    .get();

  episodesSnapshot.forEach((doc) => {
    const data = doc.data();
    if (!isEmpty(data)) {
      episodes[data.id] = data;
    }
  });
  return episodes;
}

export function deleteListenedEpisode(userId, episode) {
  return firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(userId)
    .collection(LISTENED_EPISODES_COLLECTION)
    .doc(episode)
    .delete();
}
