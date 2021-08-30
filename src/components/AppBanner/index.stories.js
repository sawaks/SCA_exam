// eslint-disable-next-line import/no-extraneous-dependencies
import { text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import Header from '../Typography/Header';
import AppBanner from './index';

export default {
  component: AppBanner,
  title: 'AppBanner',
  parameters: {
    componentSubtitle: 'This in an example',
  },
  decorators: [withKnobs],
};

const Icon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%) rotate(90deg);
  width: 80px;
  height: 60px;
  cursor: pointer;
`;

const Arrow = styled.div`
  position: absolute;
  top: 25px;
  width: 90%;
  height: 10px;
  background-color: #fff;
  box-shadow: 0 3px 5px rgba(0, 0, 0, .2);
  animation: arrow 700ms linear infinite;

  &:after {
    content: '';
    position: absolute;
    width: 60%;
    height: 10px;
    right: -8px;
    background-color: #fff;
    top: -12px;
    transform: rotate(45deg);
  }
  
  &:before {
    top: 12px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .2);
    transform: rotate(-45deg);
    content: '';
    position: absolute;
    width: 60%;
    height: 10px;
    right: -8px;
    background-color: #fff;
  }
`;

export const Default = () => (
  <>
    <Flex justifyContent="center" width={1} mt={96} mb={1400}>
      <Header as="h1" variant="xl">
        Scroll down to see the Banner
      </Header>
      <Icon>
        <Arrow />
      </Icon>
    </Flex>
    <AppBanner
      title={text('title', 'Get Listnr on your phone, start listening today')}
      description={text('description', 'Download the app description that goes over a couple of lines to be super convincing')}
      backgroundImageUrl="https://pcone-xl-img-dev.scalabs.com.au/api/assets/f35f9f1a-d86c-48cd-bbfe-10df064fff4a/"
    />
  </>
);
