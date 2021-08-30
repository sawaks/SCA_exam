import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import Breadcrumbs from '.';

storiesOf('Breadcrumbs', module)
  .addWithJSX('One Level',
    withNotes('Breadcrumbs are hidden on mobile')(() => (
      <Breadcrumbs
        currentTitle="page heading"
      />
    )))
  .addWithJSX('With Article', () => (
    <Breadcrumbs
      currentTitle="article heading"
      articleCat={{
        slug: 'test-link',
        name: 'test',
      }}
    />
  ));

