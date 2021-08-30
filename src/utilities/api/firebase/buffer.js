/**
 * addToFirebaseBuffer
 * Adds an object to the firebaseBuffer
 * @example addToFirebaseBuffer({ episodeId: 'abc', duration: 300 })
 */
export function addToFirebaseBuffer(episode) {
  const firebaseBuffer = JSON.parse(localStorage.getItem('firebaseBuffer')) || {};
  firebaseBuffer[episode.episodeId] = episode;

  localStorage.setItem('firebaseBuffer', JSON.stringify(firebaseBuffer));
}

export function getFirebaseBuffer() {
  return JSON.parse(localStorage.getItem('firebaseBuffer')) || {};
}

export function clearFirebaseBuffer() {
  localStorage.removeItem('firebaseBuffer');
}
