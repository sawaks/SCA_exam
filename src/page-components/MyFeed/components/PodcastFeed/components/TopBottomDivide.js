import Paragraph from 'components/Typography/Paragraph';
import React from 'react';
import Divider from 'components/Divider';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';

const TopBottomDivide = () => (
  <StyledWrapper>
    <StyledDivider>
      <Paragraph variant="m" text="The following are more episodes from the" transparent />
      <BottomWrapper>
        <Paragraph variant="xl" text="categories that you like." />
      </BottomWrapper>
    </StyledDivider>
    <Divider opacity={0.1} />
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  margin-bottom: ${spacing.l};
`;

const StyledDivider = styled.div`
  border-radius: 16px;
  background: url('/images/feed-bg-image.jpg') no-repeat center;
  height: 280px;
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
    height: 200px;
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
