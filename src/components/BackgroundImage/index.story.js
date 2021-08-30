import React from 'react';
import { storiesOf } from '@storybook/react';
import BackgroundImage from 'components/BackgroundImage';
import styled from 'styled-components';
import ImagePlaceholder from './mocks/cardPlaceholder.png';

storiesOf('BackgroundImage', module)
  .addWithJSX('with src', () => (
    <Wrapper>
      <BackgroundImage
        src={ImagePlaceholder}
        alt="github"
      />
    </Wrapper>
  ))
  .addWithJSX('without src', () => (
    <Wrapper>
      <BackgroundImage />
    </Wrapper>
  ));

const Wrapper = styled.div`
  width: 355px;
  height: 355px;
`;
