// eslint-disable-next-line import/prefer-default-export
export const GET_PROMOS = `
  query GetPromos{
    browsePromoItems{
      name
      url
      promoImageUrl
      promoImageMobileUrl
      slug
      type
    }
  }
`;
