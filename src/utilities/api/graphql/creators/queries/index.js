
// eslint-disable-next-line import/prefer-default-export
export const GET_CREATOR = `
  query GetCreator($slug: String!) {
    creator(where: { slug: $slug }){
      name
      image {
        url
      }
      shows {
        name
        description
        slug
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
