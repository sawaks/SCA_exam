import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { Mobile, Desktop } from '.';

storiesOf('Screen', module)
  .addWithJSX('Mobile',
    withNotes(`
      Only shows content on mobile
    `)(() => (
      <Mobile>
        Content
      </Mobile>
    ))
  )
  .addWithJSX('Desktop',
    withNotes(`
        Only shows on desktop
    `)(() => (
      <Desktop>
        Content
      </Desktop>
    ))
  )
  .addWithJSX('Both',
    withNotes(`
        Side by side
    `)(() => (
      <>
        <Mobile>Mobile</Mobile>
        <Desktop>Desktop</Desktop>
      </>
    ))
  );

