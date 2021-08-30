import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { Tabs, TabLink, TabContent } from './index';

storiesOf('Tabs', module)
  .addWithJSX('Tabs only',
    withNotes('This is the tabs without content')(() => (
      <Tabs selected="tracks" onChange={() => {}}>
        <TabLink text="station" />
        <TabLink text="tracks" />
        <TabLink text="previous tracks" />
      </Tabs>
    ))
  )
  .addWithJSX('Tabs with content',
    withNotes('This is the tabs with content')(() => (
      <Tabs selected="station" onChange={() => {}}>
        <TabLink text="station" />
        <TabLink text="tracks" />
        <TabLink text="previous tracks" />

        <TabContent for="station">
          <div>this is the station tab data</div>
        </TabContent>
        <TabContent for="tracks">
          <div>this is the tracks tab data</div>
        </TabContent>
        <TabContent for="previous tracks">
          <div>this is the previous tracks tab data</div>
        </TabContent>
      </Tabs>
    ))
  )
  .addWithJSX('Compares with navbar',
    withNotes('This is the tabs without content')(() => (
      <Tabs selected="home" onChange={() => {}}>
        <TabLink text="home" />
        <TabLink text="listen" />
        <TabLink text="news" />
        <TabLink text="win" />
        <TabLink text="vip" />
      </Tabs>
    ))
  );
