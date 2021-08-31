import React from 'react';
import FilterButton from './index';

export default {
  title: 'FilterButton',
};

export const Filter = args => (
  <FilterButton {...args} />
);

Filter.args = {
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
