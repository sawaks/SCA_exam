// eslint-disable-next-line import/prefer-default-export
export const FAQ = `
  query {
    faqs(slug:"faqs") {
      title
      slug
      items {
        question 
        answer
      }
    }
  }
`;
