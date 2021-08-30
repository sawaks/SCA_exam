import React from 'react';
import { string, number } from 'prop-types';
import spacing from 'styles/helpers/spacing';
import Divider from 'components/Divider';
import Header from 'components/Typography/Header';
import { Flex, Box } from 'components/Grid';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import Linkify from 'react-linkify';

const FAQCard = ({ index, title, description }) => (
  <>
    <Divider opacity={0.2} />
    <Flex my={spacing.l}>
      <Box width="18.5%">
        <Header as="h4" variant="l" text={index >= 10 ? `${index}.` : `0${index}.`} />
      </Box>
      <Box width="79%">
        <Header as="h4" text={title} mb="m" />
        <AnswerWrapper>
          <Linkify><p>{description}</p></Linkify>
        </AnswerWrapper>
      </Box>
    </Flex>
  </>
);

const AnswerWrapper = styled.div`
  p {
    white-space: pre-line;
    opacity: 0.7;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    ${screen.md} {
      font-size: 16px;
    }
  }
  a {
    color: ${props => props.theme.primary};
    word-break: break-all;
  }
`;

FAQCard.propTypes = {
  title: string.isRequired,
  description: string.isRequired,
  index: number.isRequired,
};

export default FAQCard;
