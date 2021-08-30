/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Section from 'components/Section';
import SocialShareButton from '.';

const options = [
  {
    title: 'Share By Facebook',
    name: 'Facebook',
    key: 'facebook',
    width: '600',
    height: '600',
  },
  {
    title: 'Share By Twitter',
    name: 'Twitter',
    key: 'twitter',
    width: '600',
    height: '250',
  },
  {
    title: 'Copy Link',
    name: 'Copy Link',
    key: 'email',
    width: '',
    height: '',
  },
];

storiesOf('SocialShareButton', module)
  .addWithJSX('SocialShareButton', () => (
    <Section>
      <SocialShareButton options={options} />
    </Section>
  ));
