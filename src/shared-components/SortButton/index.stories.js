import React from 'react';
import SortButton from './index';

export default {
  title: 'SortButton',
};

export const Default = args => (
  <SortButton {...args} />
);

Default.args = {
  side: 'right',
  onOptionClick: () => undefined,
  options: [
    {
      key: 'option1',
      value: 'Option 1',
    },
    {
      key: 'option2',
      value: 'Option 2',
    },
  ],
};
