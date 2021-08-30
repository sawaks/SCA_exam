import { GET_SHOWS, GET_SHOW, GET_LATEST_PREVIEWS, GET_HERO_CONTENTS, GET_CURATED_PLAYLISTS, GET_PLAYLISTS, GET_YOU_LIKE_PODCASTS, GET_PROMOTED_SHOWS } from 'utilities/api/graphql/shows/queries';
import { encrypt } from 'utilities/helpers/audioObsfucator';
import fetchAPI from '../../index';

export async function getShow(slug) {
  try {
    return await fetchAPI(GET_SHOW, {
      slug,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getShow');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

export async function getShows(playlistIds) {
  try {
    return await fetchAPI(GET_SHOWS, { playlistIds });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getShows');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

export async function getPreviews() {
  try {
    const { latestPreviews } = await fetchAPI(GET_LATEST_PREVIEWS);
    return latestPreviews?.map(item => ({
      ...item,
      audioUrl: encrypt(item.audioUrl),
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getPreviews');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

export async function getHeroContents() {
  try {
    const { heroContents } = await fetchAPI(GET_HERO_CONTENTS);
    return heroContents?.map((item) => {
      if (item.trailerEpisode) {
        return {
          ...item,
          trailerEpisode: { audioUrl: encrypt(item?.trailerEpisode?.audioUrl) },
        };
      }
      return item;
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getHeroContents');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

export async function getCuratedPlaylists() {
  try {
    return await fetchAPI(GET_CURATED_PLAYLISTS);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getCuratedPlaylists');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

export async function getPlaylists(slug) {
  try {
    return await fetchAPI(GET_PLAYLISTS, { slug });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getPlaylists');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

export async function getYouMighLike(ids) {
  try {
    return await fetchAPI(GET_YOU_LIKE_PODCASTS, { ids });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getYouMighLike');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}

export async function getPromotedShows() {
  try {
    return await fetchAPI(GET_PROMOTED_SHOWS);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR => getYouMighLike');
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
}
