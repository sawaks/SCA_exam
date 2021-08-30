// eslint-disable-next-line import/prefer-default-export
export const GET_ALL_GENRES = `
  query GetAllGenres {
    allGenres: genres {
      slug
      name
      description
      images {
        bannerLarge
        squareLarge
      }
    }
  }
`;

export const GET_GENRE_BY_SLUG = `
 query GetOneGenre($slugs: [String!], $order: String!) {
  genres(slugs: $slugs){
    name
    slug
    colour
    description
    images {
      squareLarge 
      squareMedium 
      squareSmall
    }
    stations(sort: { order: $order }){
      slug
      name
      description
      backgroundColour
      images {
        logoLarge
      }
    }
  }
}
`;

export const GET_PROMOTED_GENRES = `
  query getPromotedGenres {
    promotedGenres {
      name
      slug
      colour
      images {
        bannerMedium
      }
    }
  }
`;
