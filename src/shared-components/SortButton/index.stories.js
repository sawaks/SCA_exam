import React from 'react';
import SortButton from './index';

export default {
  title: 'Button/SortButton',
  component: SortButton,
};

const Template = args => <SortButton {...args} />;

export const Default = Template.bind({});
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

