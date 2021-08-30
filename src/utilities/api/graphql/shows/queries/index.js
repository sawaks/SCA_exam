// eslint-disable-next-line import/prefer-default-export

export const GET_SHOW = `
  query GetOneShow($slug: String!) {
     show(where: { slugOrId: $slug }) {
      id
      slug
      name
      showType
      contentType
      liveShowInfo
      liveSchedule(all: true) {
        day
        startUtc
        endUtc
      }
      studioPhone
      audioStreams {
        callSign url timezone state
        appLogoUrl
        appHqStream
        appLqStream
        appHqStreamFormat
        appLqStreamFormat
        chromecastStream
        chromecastStreamFormat
      }
      seasons {
        season
        total
      }
      images {
        background {
          url
        }
        bannerLarge {
          url
        }
        bannerSmall {
          url
        }
        squareSmall {
          url
        }
        squareMedium{
          url
        }
        squareLarge {
          url
        }
      }
      colourPrimary
      rssFeedUrl
      description
      playlistCategories
      categories {
        name
        slug
        images {
          squareMedium {
            url
          }
        }
      }
      creators{
        name
        slug
        image {
        url
      }
      }
      trailerEpisode {
        audioUrl
      }
      relatedShows {
        id
        slug
        name
        description
        images {
          squareSmall {
            url
          }
          squareLarge {
            url
          }
        }
      }
    }
  }
`;

export const GET_SHOWS = `
  query GetShows($playlistIds: [String!]) {
     shows(playlistIds: $playlistIds) {
      id
      slug
      name
      showType
      contentType
      description
      categories {
        name
      }
      images {
        bannerLarge {
          url
        }
        bannerSmall {
          url
        }
        squareSmall {
          url
        }
        squareMedium{
          url
        }
        squareLarge {
          url
        }
      }
      episodes {
        items {
          id
          publishedUtc
        }
      }
    }
  }
`;

export const GET_PLAYLISTS = `
  query GetPlaylists($slug: String!) {
    playlist(slug: $slug) {
    playlistSlug: slug
    name
    description
    colourPrimary
    colourDark
    colourLight
    images {
      bannerLarge {
        url
      }
      squareSmall {
        url
      }
      squareLarge {
        url
      }
    }
    episodes {
      title
      description
      id
      slug
      tags
      episode
      season
      imageUrl
      durationSeconds
      publishedUtc
      shareUrl
      show {
        id
        slug
        name
        slug
        name
        images {
          squareSmall {
            url
          }
          squareLarge {
            url
          }
        }
      }
    }
  }
}
`;

export const GET_LATEST_PREVIEWS = `
  query GetLatestPreviews {
    latestPreviews {
      id
      slug
      episode
      episodeType
      playlistIds
      audioUrl
      show {
        categories {
          name
        }
        id
        name
        slug
        colourDark
        images {
          squareLarge {
            url
          }
          previewImage {
            url
          }
        }
      }
    }
  }
`;

export const GET_ALL_PODCASTS = `
  query GetAllPodcasts {
    podcasts {
        id
        thumbnailArtworkUrl
        slug
        categories {
          name
          slug
        }
        name
        numberOfEpisodes
    }
  }
`;

export const GET_POPULAR_PODCASTS = `
  query GetPopularPodcasts {
    popularPodcasts {
      id
      name
      teaser
      description
      slug
      smallArtworkUrl
      playlistCategories
    }
  }
`;

export const GET_WHATS_NEW_PODCASTS = `
  query GetWhatsNewPodcasts {
    whatsNewPodcasts {
      id
      name
      slug
      smallArtworkUrl
      playlistCategories
      description
      teaser
    }
  }
`;

export const GET_FAVOURITE_PODCASTS_WITH_EPISODECOUNT = `
  query GetFavPodcastWithEpisodeCount($id:ID!, $pageNumber:Int!, $pageSize:Int!, $sortOrder:EpisodesOrderByInput) {
    podcast(where: { id: $id }) {
      id
      name
      slug
      smallArtworkUrl
      episodes(page: {number:$pageNumber, size:$pageSize}, orderBy: $sortOrder) {
        items {
          id
          publishedUtc
        }
      }
    }
  }
`;

export const GET_YOU_LIKE_PODCASTS = `
query GetYouMightLikePodcasts($ids:[String!]!) {
  youMightLikeShows(where: { id_in: $ids }) {
    name
    id
    description
    slug
    playlistCategories
    images {
      squareLarge {
        url
      }
    }
  }
}

`;

export const GET_HERO_PODCASTS = `
  query GetHeroPodcasts {
    heroPodcasts {
      id
      name
      slug
      heroImageUrl
      heroImageMobileUrl
      description
    }
  }
`;

export const GET_HERO_CONTENTS = `
  query GetHeroContents {
    heroContents {
      type
      name
      slug
      description
      playlistCategories
      colourPrimary
      colourLight
      colourDark
      images {
        bannerLarge {
          url
          pixelWidth
        }
        bannerMedium {
          url
          pixelWidth
        }
        bannerSmall {
          url
          pixelWidth
        }
      }
      trailerEpisode {
        audioUrl
      }
    }
  }
`;

export const GET_CURATED_PLAYLISTS = `
  query GetCuratedPlaylists {
    curatedPlaylists {
      name
      slug
      description
      images {
        bannerMedium {
          url
        }
        squareLarge{
          url
        }
      }
    }
  }
`;

export const GET_PROMOTED_SHOWS = `
{
  promotedShows {
    id
    name
    description
    slug
    images {
      squareLarge {
        url
      }
    }
  }
}

`;
