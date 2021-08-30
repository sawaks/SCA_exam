import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import Footer from 'components/Footer';

storiesOf('Footer', module)
  .addWithJSX('Default footer',
    withNotes(`
      This is the default footer
    `)(() => (
      <Footer stationCode="fox" />
    ))
  );
