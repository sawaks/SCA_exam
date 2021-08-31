import React from 'react';
import Header from './index';

export default {
  title: 'Example/Header',
  component: Header,
};

const Template = args => <Header {...args} />;

export const xl = Template.bind({});
xl.args = {
  as: 'h1',
  variant: 'xl',
  text: 'Header XL - 70%',
  label: 'Header',
};

export const l = Template.bind({});
l.args = {
  variant: 'l',
  text: 'Header L',
  label: 'Header',
};

export const m = Template.bind({});
m.args = {
  variant: 'm',
  text: 'Header m',
  label: 'Header',
};

export const s = Template.bind({});
s.args = {
  variant: 's',
  text: 'Header s',
  label: 'Header',
};

export const Transparent = Template.bind({});
Transparent.args = {
  transparent: true,
  text: 'Header 70%',
};
