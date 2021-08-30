import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components';
import NavBarUI from './components/NavBarUI';
import MobileNavUI from './components/MobileNav/MobileNavUI';

export default {
  component: NavBarUI,
  title: 'NavBar',
  parameters: {
    componentSubtitle: 'This in an example',
  },
  decorators: [withKnobs],
};

const Div = styled.div`
  display: flex;
  height: calc(100vh - 26px);
  flex-direction: column;
  justify-content: space-between;
`;

export const Default = () => (
  <Div>
    <NavBarUI
      isPWA={false}
      isLoggedIn={boolean('Logged In', false)}
      firstName={text('First Name', 'Leonardo')}
      lastName={text('Last Name', 'Da Vinci')}
    />
    <MobileNavUI isLoggedIn={boolean('Logged In', false)} />
  </Div>
);
