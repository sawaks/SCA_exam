/* eslint-disable import/prefer-default-export */
export const GET_PAGE = `
  query getPage($slug: String!) {
    page(slug:$slug) {
      slug
      title
      meta
      contentBlocks
    }
  }
`;
