import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import Section from 'components/Section';
import TestImage from './mocks/bg.png';

storiesOf('Section', module)
  .addWithJSX('with top divider',
    withNotes(`
      This is the Section component
    `)(() => (
      <Section top>
        <img src={TestImage} alt="storybookImage" />
      </Section>
    ))
  ).addWithJSX('with no divider',
    withNotes(`
        This is the Section component
    `)(() => (
      <Section>
        <img src={TestImage} alt="storybookImage" />
      </Section>
    ))
  ).addWithJSX('with small bottom spacing',
    withNotes(`
        This is the Section component with small bottom spacing
    `)(() => (
      <Section top smallBottomPadding>
        <img src={TestImage} alt="storybookImage" />
      </Section>
    ))
  );
