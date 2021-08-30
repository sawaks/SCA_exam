import React from 'react';
import { storiesOf } from '@storybook/react';
import Slider from 'components/Slider';
import styled from 'styled-components';
import shows from './mocks/shows';

storiesOf('Slider', module)
  .addWithJSX('Slider', () => (
    <Slider slidesToScroll={1} title="Generic slider">
      {shows.map(show => <Div key={show.name}>{show.name}</Div>)}
    </Slider>
  ))
  .addWithJSX('Slider, with viewAll Link', () => (
    <Slider slidesToScroll={5} title="Generic slider" viewAll={{ as: '', href: { pathname: '', query: {} } }}>
      {shows.map(show => <Div key={show.heading}>{show.heading}</Div>)}
    </Slider>
  ));

const Div = styled.div`
  margin: 12px;
  width: 100px !important;
  border: 1px solid black;
`;
