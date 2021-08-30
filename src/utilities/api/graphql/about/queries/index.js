// eslint-disable-next-line import/prefer-default-export
export const GET_ABOUT_US = `
  query AboutPageTeamMembers {
     aboutPage {
      title
      description
      teammembers {
        name
        position
       image {
          url
        }
        description
      }
    }
  }
`;
