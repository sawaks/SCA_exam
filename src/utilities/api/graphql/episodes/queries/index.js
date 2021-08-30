export const GET_EPISODES = `
   query GetEpisodes($slug: String!, $pageNo: Int, $orderBy: String, $size: Int=10000) {
     show(where: { slugOrId: $slug }) {
      id
      slug
      name
      episodes(page: { size: $size, order: $orderBy, number: $pageNo }) {
        totalItems
        currentPage
        items {
          id
          title
          slug
          description
          imageUrl
          season
          episode
          contentRating
          durationSeconds
          publishedUtc
        }
      }
    }
  }
`;

export const GET_SEASON_FROM_EPISODE_SLUG = `
   query GetSeasonFromEpisodeSlug($slug: String!) {
    episode(where: {slugOrId: $slug}){
      season
    }
  }
`;

export const GET_EPISODE_AND_SHOW_FROM_SEASON = `
  query getEpisodeAndShowBySeason($slug: String!, $season: Int) {
     show(where: { slugOrId: $slug }) {
      id
      slug
      name
      showType
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
      episodes(season: $season ) {
        totalItems
        currentPage
        items {
          id
          title
          slug
          description
          imageUrl
          season
          episode
          contentRating
          durationSeconds
          publishedUtc
          show {
            name
            id
            categories {
              name
            }
          }
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

export const GET_EPISODES_BY_SEASONS = `
   query GetEpisodes($slug: String!, $season: Int) {
     show(where: { slugOrId: $slug }) {
      id
      slug
      name
      showType
      seasons {
        season
        total
      }
      episodes(season: $season) {
        totalItems
        currentPage
        items {
          id
          title
          slug
          durationSeconds
          description
          imageUrl
          season
          episode
          contentRating
          publishedUtc
          show {
            name
            id
            categories {
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_EPISODES_BY_SEASONS_AND_ORDER = `
   query GetEpisodes($slug: String!, $season: Int, $order: String!) {
     show(where: { slugOrId: $slug }) {
      id
      slug
      name
      showType
      seasons(sort: {order: $order} ) {
        season
        total
      }
      episodes(season: $season, page: {order: $order}) {
        totalItems
        currentPage
        items {
          id
          title
          slug
          durationSeconds
          description
          imageUrl
          season
          episode
          contentRating
          publishedUtc
          show {
            name
            id
            categories {
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_EPISODES_BY_ORDER = `
   query GetEpisodes($slug: String!, $pageNo: Int, $orderBy: String, $size: Int=10000) {
     show(where: { slugOrId: $slug }) {
      id
      slug
      name
      episodes(page: { size: $size, order: $orderBy, number: $pageNo }) {
        totalItems
        currentPage
        items {
          id
          title
          slug
          durationSeconds
          description
          imageUrl
          season
          episode
          durationSeconds
          publishedUtc
        }
      }
    }
  }
`;

export const GET_MULTIPLE_EPISODES = `
  query GetMultipleEpisodes($id_in: [String]!) {
    episodes(where: { id_in: $id_in }) {
      id
      title
      description
      imageUrl
      season
      durationSeconds
      publishedUtc
      contentRating
      season
      episode
      podcast{
        name
        categories{
          name
        }
      }
    }
  }
`;

export const GET_ONE_EPISODE = `
  query GetOneEpisode($id: String!) {
    episode(where: { slugOrId: $id }) {
      id
      slug
      title
      description
      imageUrl:imageUrl
      imageUrl
      season
      durationSeconds
      publishedUtc
      publishedPath: publishedUrl
      audioUrl
      contentRating
      season
      episode
      episodeType
      show {
        id
        slug
        name
        contentType
        seasons {
          season
          total
        }
        episodes {
          totalItems
        }
        playlistCategories
        categories {
          name
        }
        images{
          background { url }
          squareLarge { url }
          squareSmall { url }
        }
      }
    }
  }
`;

export const GET_ONE_EPISODE_BY_PUBLISHED_PATH = `
  query GetOneEpisodeByPublishedPath($publishedPath: String) {
    episode(where: { publishedPath: $publishedPath }){
      id
      slug
      title
      description
      imageUrl
      season
      durationSeconds
      publishedUtc
      publishedPath
      contentRating
      podcastId
      podcast {
        name
        slug
        id
        categories {
          name
        }
      }
    }
  }
`;

export const GET_TRENDING_EPISODES = `
query GetTrendingEpisodes{
  trendingEpisodes{
    id
    title
    description
    imageUrl
    durationSeconds
    publishedUtc
    contentRating
    season
    episode
    show {
      categories {
        name
      }
      name
      id
      slug
    }
  }
}
`;
