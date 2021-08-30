/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import Header from './Header';
import Paragraph from './Paragraph';
import Tag from './Tag';
import AnimatedHeader from './AnimatedHeader';

export default {
  component: Header,
  title: 'Typography',
  parameters: {
    componentSubtitle: 'This in an example',
  },
  decorators: [withKnobs],
};

const Space = styled.div`
  padding: ${props => (props.times ? `${props.times * 12}px` : '12px')};
`;

export const Default = () => (
  <>
    <Header as="h1" variant="xl" text="Heading XL" />
    <Space />
    <Header as="h2" variant="l" text="Header L" />
    <Space />
    <Header as="h3" variant="m" text="Header M" />
    <Space />
    <Header as="h4" variant="s" text="Header S" />
    <Space times={3} />
    <Paragraph variant="xl" text="Paragraph XL" />
    <Space />
    <Paragraph variant="l" text="Paragraph L" />
    <Space />
    <Paragraph variant="m" text="Paragraph M" />
    <Space />
    <Paragraph variant="s" text="Paragraph S" />

    <Space times={3} />
    <Paragraph variant="xl" text="Paragraph XL - 70%" transparent />
    <Space />
    <Paragraph variant="l" text="Paragraph L - 70%" transparent />
    <Space />
    <Paragraph variant="m" text="Paragraph M - 70%" transparent />
    <Space />
    <Paragraph variant="s" text="Paragraph S - 70%" transparent />
    <Space times={3} />
    <Tag text="tag & breadcrumb TITLE" />
    <Space />
    <Tag text="tag & breadcrumb TITLE - 70%" transparent />
  </>
);

const asOptions = ['h1', 'h2', 'h3', 'h4', 'h5'];
const variantOptions = ['xxl', 'xl', 'l', 'm', 's'];

export const Animated = () => (
  <>
    <AnimatedHeader
      as={select('Tag', asOptions)}
      text={text('Text', 'Heading XL')}
      variant={select('Variant', variantOptions, 'xxl')}
    />
  </>
);
