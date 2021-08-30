/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Section from 'components/Section';
import Header from 'components/Typography/Header';
import TopicFilter from '.';

const options = [
  { key: 'latest', name: 'View Latest', value: 'desc' },
  { key: 'oldest', name: 'View Oldest', value: 'asc' },
];

const props = {
  orderByKey: 'latest',
  onSelectionChange: () => 'testing',
};

storiesOf(' TopicFilter', module)
  .addWithJSX('Topic filter list', () => (
    <Section>
      <TopicFilter options={options} {...props}>
        <Header
          as="h1"
          marginBottom="l"
          marginTop="m"
          text="Latest"
        />
      </TopicFilter>
    </Section>
  ));
