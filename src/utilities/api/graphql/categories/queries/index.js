
// eslint-disable-next-line import/prefer-default-export

export const GET_ALL_CATEGORIES = `
  query GetAllCategories{
    categories {
      id
      name
      slug
      colour
      images {
        bannerLarge {
          url
        }
      }
      shows {
        id
        name
        slug
        tier
        showType
        images {
          squareLarge {
            url
          }
        }
      }
    }
  }
`;

export const GET_CATEGORIES = `
query GetOneCategory($slugs: [String]!, $order: String!) {
  categories(slugs: $slugs){
    id
    name
    slug
    colour
    description
    images {
      squareLarge {
        url
        pixelWidth
      }
      squareMedium {
        url
        pixelWidth
      }
      squareSmall {
        url
        pixelWidth
      }
    }
    shows(sort: { order: $order }){
      id
      slug
      name
      description
      images {
        squareLarge {
          url
          pixelWidth
        }
      }
    }
  }
}
`;

export const GET_CATEGORY_BASED_CAROUSELS = `
  query CategoryBasedPodcastCarousels {
    promotedCategories {
      slug
      name
      colour
      images{
        bannerSmall{
          url
        }
      }
      shows {
        id
        slug
        name
        description
        categories {
          name
        }
        images {
          squareLarge {
            url
          }
        }
      }
    }
  }
`;

export const GET_PROMOTED_CATEGORIES_SHOWS = `
  query GetPromotedCategoriesShows {
    promotedCategoriesShows{
    id
    name
    description
    slug
    colour
    images{
      squareLarge{
        url
      }
    }
    shows{
      id
      name
      description
      slug
      colourDark
      images{
        squareLarge{
          url
        }
      }
    }
  }
  }
`;

export const GET_ALL_CATEGORIES_OF_PODCAST = `
  query GetAllCategoriesOfPodcast{
    categories {
      name
      slug
      description
      colour
      images {
        square {
          url
        }
      }
    }
  }
`;
