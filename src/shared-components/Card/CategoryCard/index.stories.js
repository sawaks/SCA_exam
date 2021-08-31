import React from 'react';
import CategoryCard from './index';

export default {
  title: 'Card',
};

export const Category = args => <CategoryCard {...args} />;

Category.args = {
  as: 'a',
  bg: '#fd791c',
  image: 'https://listnr-img-prod.scalabs.com.au/api/assets/mercury/c3920f08-a742-486d-904c-ead784e112e5?width=374&height=238',
  heading: 'Crime',
};
