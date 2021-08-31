import React from 'react';
import Paragraph from './index';

export default {
  title: 'Example/Paragraph',
  component: Paragraph,
};

const Template = args => <Paragraph {...args} />;

export const xl = Template.bind({});
xl.args = {
  variant: 'xl',
  text: 'Paragraph XL - 70%',
  label: 'Paragraph',
};

export const l = Template.bind({});
l.args = {
  variant: 'l',
  text: 'Paragraph L',
  label: 'Paragraph',
};

export const m = Template.bind({});
m.args = {
  variant: 'm',
  text: 'Paragraph m',
  label: 'Paragraph',
};

export const s = Template.bind({});
s.args = {
  variant: 's',
  text: 'Paragraph s',
  label: 'Paragraph',
};

export const Transparent = Template.bind({});
Transparent.args = {
  transparent: true,
  text: 'Paragraph 70%',
};
