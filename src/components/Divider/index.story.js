import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import Divider from 'components/Divider';

storiesOf('Divider', module)
  .addWithJSX('without text',
    withNotes(`
      This is the default divider
    `)(() => (
      <Divider />
    ))
  ).addWithJSX('with text',
    withNotes(`
    This is the default divider with text element
  `)(() => (
    <Divider
      text="This is a divider with a text element"
    />
    ))
  );
