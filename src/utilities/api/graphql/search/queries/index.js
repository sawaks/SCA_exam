// eslint-disable-next-line import/prefer-default-export
export const SEARCH = `
  query Search($term: String!) {
    search(term: $term) {
      shows {
        id
        slug
        name
        description
        images {
          squareLarge {
            url
          }
        }
      }
      episodes {
        title
        description
        imageUrl
        durationSeconds
        season
        id
        episode
        tags
        show {
          id
          slug
        }
      }
      stations {
        name
        slug
        description
        backgroundColour
        images {
          logoLarge
        }
      }
    }
  }
`;

export const GET_AUTOCOMPLETE = `
  query GetAutocomplete($term: String!) {
    searchSuggestions(term: $term)
  }
`;
