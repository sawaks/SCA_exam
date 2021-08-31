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

