import 'firebase/firestore';

import firebase from 'firebase/app';
import { FAVOURITE_CATEGORIES_COLLECTION, FAVOURITE_SHOWS_COLLECTION, FAVOURITE_GENRES_COLLECTION, USERS_COLLECTION, FAVOURITE_STATIONS_COLLECTION } from 'utilities/api/firebase/collections';

export async function addFavouriteCategory(userId, category) {
  return firebase.firestore().collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FAVOURITE_CATEGORIES_COLLECTION)
    .doc(category.id)
    .set(category);
}

export function deleteFavouriteCategory(userId, categoryId) {
  return firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FAVOURITE_CATEGORIES_COLLECTION)
    .doc(categoryId)
    .delete();
}

export async function setFavouriteCategories(userId, favouriteCategories) {
  const db = firebase.firestore();

  const colRef = await db.collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FAVOURITE_CATEGORIES_COLLECTION);

  const batch = db.batch();

  favouriteCategories.forEach((category) => {
    const ref = colRef.doc(category.id);
    batch.set(ref, category);
  });

  return batch.commit();
}

export async function readFavouriteCategories(id) {
  const favCategories = [];

  const snapshot = await firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(`${id}`)
    .collection(FAVOURITE_CATEGORIES_COLLECTION)
    .get();

  snapshot.forEach((doc) => {
    favCategories.push(doc.data());
  });

  return favCategories;
}

export async function addFavouriteShow(userId, show) {
  return firebase.firestore().collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FAVOURITE_SHOWS_COLLECTION)
    .doc(show.id)
    .set(show);
}

export async function updateFavouriteShow(userId, showId, episodeSortOrder, lastSeen) {
  return firebase.firestore().collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FAVOURITE_SHOWS_COLLECTION)
    .doc(showId)
    .update({
      lastSeen,
      ...(episodeSortOrder && { episodeSortOrder }),
    });
}

export function deleteFavouriteShow(userId, showId) {
  return firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FAVOURITE_SHOWS_COLLECTION)
    .doc(showId)
    .delete();
}

export async function readFavouriteShows(id) {
  const favShows = [];

  const snapshot = await firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(`${id}`)
    .collection(FAVOURITE_SHOWS_COLLECTION)
    .get();

  snapshot.forEach((doc) => {
    favShows.push(doc.data());
  });

  return favShows;
}

export async function setFavouriteShows(userId, favouriteShows) {
  const db = firebase.firestore();

  const colRef = await db.collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FAVOURITE_SHOWS_COLLECTION);

  const batch = db.batch();

  favouriteShows.forEach((show) => {
    const ref = colRef.doc(show.id);
    batch.set(ref, show);
  });

  return batch.commit();
}

export async function addFavouriteGenre(userId, genre) {
  return firebase.firestore().collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FAVOURITE_GENRES_COLLECTION)
    .doc(genre.slug)
    .set(genre);
}

export function deleteFavouriteGenre(userId, genreSlug) {
  return firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FAVOURITE_GENRES_COLLECTION)
    .doc(genreSlug)
    .delete();
}

export async function setFavouriteGenres(userId, favouriteGenres) {
  const db = firebase.firestore();

  const colRef = await db.collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FAVOURITE_GENRES_COLLECTION);

  const batch = db.batch();

  favouriteGenres.forEach((genre) => {
    const ref = colRef.doc(genre.slug);
    batch.set(ref, genre);
  });

  return batch.commit();
}

export async function readFavouriteGenres(id) {
  const favGenres = [];

  const snapshot = await firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(`${id}`)
    .collection(FAVOURITE_GENRES_COLLECTION)
    .get();

  snapshot.forEach((doc) => {
    favGenres.push(doc.data());
  });

  return favGenres;
}

export async function setFavouriteStations(userId, favouriteStations) {
  const db = firebase.firestore();

  const colRef = await db.collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FAVOURITE_STATIONS_COLLECTION);

  const batch = db.batch();

  favouriteStations.forEach((station) => {
    const ref = colRef.doc(station.slug);
    batch.set(ref, station);
  });

  return batch.commit();
}

export async function readFavouriteStations(userId) {
  const favStations = [];

  const snapshot = await firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FAVOURITE_STATIONS_COLLECTION)
    .get();

  snapshot.forEach((doc) => {
    favStations.push(doc.data());
  });

  return favStations;
}

export async function updateFavouriteStation(userId, stationId, lastSeen) {
  return firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FAVOURITE_STATIONS_COLLECTION)
    .doc(stationId)
    .update({
      lastSeen,
    });
}

export async function addFavouriteStation(userId, station) {
  return firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FAVOURITE_STATIONS_COLLECTION)
    .doc(station.slug)
    .set(station);
}

export async function deleteFavouriteStation(userId, stationId) {
  return firebase.firestore()
    .collection(USERS_COLLECTION)
    .doc(userId)
    .collection(FAVOURITE_STATIONS_COLLECTION)
    .doc(stationId)
    .delete();
}
