import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import spacing from 'styles/helpers/spacing';
import CTA from './index';

storiesOf('CTA Text', module)
  .addWithJSX('Button - same text',
    withNotes('Button that has same text on mobile and desktop')(() => (
      <CTA
        text="Call To Action text"
      />
    ))
  ).addWithJSX('Button - responsive text',
    withNotes('Button that has different text on mobile and desktop')(() => (
      <CTA
        text="Call To Action desktop text"
        mobileText="Call To Action mobile text"
      />
    ))
  ).addWithJSX('Button - desktop only text',
    withNotes('Button that has desktop only text')(() => (
      <CTA
        text="Call To Action desktop text"
        mobileText=""
      />
    ))
  )
  .addWithJSX('Button - desktop only text with left and right padding',
    withNotes('Button text that has desktop only left and right padding')(() => (
      <CTA
        text="Call To Action text"
        leftPadding={spacing.m}
        rightPadding={spacing.m}
      />
    ))
  );

