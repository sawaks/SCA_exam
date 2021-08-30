/* eslint-disable import/prefer-default-export */
export const GET_STATION_BY_SLUG = `
  query GetStationBySlug($slug: String!) {
    station(where: { slug: $slug }) {
      name
      slug
      description
      stationCode
      stationType
      network
      state
      metaTitle
      metaDescription
      backgroundColour
      audioStreams {
        callSign
        url
      }
      shows{ 
        name 
        colourDark 
        images { squareLarge { url } } 
        slug 
        description 
      }
      networkShows { 
        name 
        colourDark 
        images { squareLarge { url } } 
        slug 
        description 
      }
      stationShows { 
        name 
        colourDark 
        images { squareLarge { url } } 
        slug 
        description 
      }
      relatedStations{
        name
        slug
        description
        stationType
        stationCode
        network
        backgroundColour
        images { logoLarge }
      }
      images {
        logoLarge
        playerBackground
        share
        stationBackgroundLarge
        stationBackgroundSmall
      }
      genres {
        name
        slug
        description
      }
    }
  }
`;

export const GET_STATIONS_BY_SLUG = `
  query GetStationsBySlug($slugs: [String!]) {
    stations(where: { slugs: $slugs }) {
      name
      slug
      description
      backgroundColour
      images { logoLarge }
    }
  }
`;

export const GET_RELATED_STATIONS_BY_SLUG = `
  query GetRelatedStationsBySlug($slug: String!) {
    station (where: {slug: $slug})  
    { 
      network
      stationType
      allRelatedStations {
        title
        groupItems {
          title
          items { name slug logoImageUrl backgroundColour }
        }
      }
    }
  }
`;

export const GET_PROMOTED_STATIONS = `
  {
    promotedStations {
      name
      slug
      network
      backgroundColour
      images {
        logoLarge
      }
    }
  }
`;

export const GET_ONBOARDING_STATIONS = `
  query OnboardStations($genreSlugs: [String!]) {
    onboardStations(genreSlugs: $genreSlugs){
      name
      stationType
      slug
      network
      logoImageUrl
      backgroundColour
    }
  }
`;

export const GET_ONBOARDING_FAVOURITE_STATIONS = `
  query OnboardFavStations($postcode: String!, $slugs: [String!]) {
    onboardFavouriteStations(postcode: $postcode, slugs: $slugs) {
        name
        slug
        network
        stationType
    }
  }
`;

export const GET_ALL_STATIONS = `
  query GetAllStations {
    stations {
        slug
    }
  }
`;
