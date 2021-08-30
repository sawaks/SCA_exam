import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Notification from './index';

const StyledDiv = styled.div`
  width: 250px;
  height: 250px;
  background-color: #2068B2;
  position: relative;
`;

storiesOf('Notification', module)
  .addWithJSX('Notification with 1 digit', () => (
    <StyledDiv>
      <Notification count={1} />
    </StyledDiv>
  ))
  .addWithJSX('Notification with 2 digits', () => (
    <StyledDiv>
      <Notification count={99} />
    </StyledDiv>
  ))
  .addWithJSX('Notification with 3 digits', () => (
    <StyledDiv>
      <Notification count={999} />
    </StyledDiv>
  ))
  .addWithJSX('Notification with custom offset', () => (
    <StyledDiv>
      <Notification
        count={10}
        desktopTopOffset="20px"
        desktopRightOffset="20px"
      />
    </StyledDiv>
  ));
