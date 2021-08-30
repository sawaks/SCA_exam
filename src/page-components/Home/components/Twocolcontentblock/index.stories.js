/* eslint-disable max-len */
import React from 'react';
import Twocolcontentblock from './index';

export default {
  component: Twocolcontentblock,
  title: 'Two Column Block',
};

const props = {
  text: "Stream radio from your favourite stations including Hit FM, MMM, Old Skool 90's, Easy 80's, Soft Rock, Country and more.",
};

export const Default = () => (<Twocolcontentblock {...props} />);
