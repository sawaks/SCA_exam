import Paragraph from 'components/Typography/Paragraph';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';

const TopBottomDivide = () => (
  <StyledDivider>
    <Paragraph variant="m" text="The following are more stations from the" transparent />
    <BottomWrapper>
      <Paragraph variant="xl" text="genres that you like." />
    </BottomWrapper>
  </StyledDivider>
);

const StyledDivider = styled.div`
  border-radius: 16px;
  background: url('/images/feed-bg-image.jpg') no-repeat center;
  min-height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: top;
  margin: ${spacing.m} 0;

  ${screen.sm}{
    border-radius: ${spacing.m};
    background-size: 100%;
  }
  ${screen.md}{
    background-size: 100%;
  }
`;

const BottomWrapper = styled.div`
  p {
    font-family: dunbar-tall, sans-serif;
    font-weight: bold;
  }
`;

export default TopBottomDivide;
