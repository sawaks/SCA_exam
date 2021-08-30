import firebase from 'firebase/app';
import 'firebase/firestore';
import { FEED_COLLECTION, USERS_COLLECTION } from 'utilities/api/firebase/collections';

// eslint-disable-next-line import/prefer-default-export
export async function generateMyFeed(userId, categories, shows) {
  const generateUserFeedCallable = firebase.app().functions('australia-southeast1').httpsCallable('generateUserFeedCallable');
  return generateUserFeedCallable({
    user: { id: userId },
    categories,
    shows,
  });
}

export async function generateStationsFeed(userId, genreSlugs, stationSlugs) {
  const generateStationsFeedCallable = firebase.app().functions('australia-southeast1').httpsCallable('generateStationsFeedCallable');
  return generateStationsFeedCallable({
    user: { id: userId },
    genreSlugs,
    stationSlugs,
  });
}

export function readMyFeed(userId) {
  return firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FEED_COLLECTION)
    .doc('sections')
    .get();
}

export function readStationsFeed(userId) {
  return firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FEED_COLLECTION)
    .doc('stationSections')
    .get();
}
