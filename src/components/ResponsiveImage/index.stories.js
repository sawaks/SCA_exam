import React from 'react';
import ResponsiveImage from './index';

const srcSet = [
  {
    url: 'https://master.bello-cms.dev.scadigital.com.au/api/assets/93012be2-676d-405b-9c3c-b3279785c202?width=471&height=299',
    pixelWidth: 471,
  },
  {
    url: 'https://master.bello-cms.dev.scadigital.com.au/api/assets/93012be2-676d-405b-9c3c-b3279785c202?width=374&height=238',
    pixelWidth: 374,
  },
  {
    url: 'https://master.bello-cms.dev.scadigital.com.au/api/assets/93012be2-676d-405b-9c3c-b3279785c202?width=930&height=590',
    pixelWidth: 930,
  },
];
export default { title: 'Responsive Image' };

export const Default = () => (
  <ResponsiveImage src={srcSet} />
);
