import { Box, Flex } from '@rebass/grid';
import NextBackgroundImage from 'components/NextBackgroundImage';
import Header from 'components/Typography/Header';
import { arrayOf, shape, string } from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import FaqAccordion from './components/FaqAccordion';

function Faq({ faqs, backgroundImageUrl }) {
  const [visibleIndex, setVisibleIndex] = useState(null);

  const handleOnClick = (index) => {
    if (visibleIndex === index) {
      setVisibleIndex(null);
    } else {
      setVisibleIndex(index);
    }
  };

  return (
    <FaqWrapper data-test="faq">
      <NextBackgroundImage alt="faq-image" imageUrl={backgroundImageUrl}>
        <Flex justifyContent="center" mx={spacing.l}>
          <AccordionsWrapper py={[spacing.l, spacing.xl, spacing.xl]} px={[spacing.m, spacing.l, spacing.l]}>
            <HeaderWrapper mb={[spacing.l, spacing.xl, spacing.xl]}>
              <Header as="h1" variant="display" text="Your questions, answered" />
            </HeaderWrapper>
            <Flex flexDirection="column">
              {faqs.map(({ question, answer }, i) => (
                <FaqAccordion
                  key={question}
                  question={question}
                  answer={answer}
                  visible={visibleIndex === i}
                  onClick={() => handleOnClick(i)}
                />
              ))}
            </Flex>
          </AccordionsWrapper>
        </Flex>
      </NextBackgroundImage>
    </FaqWrapper>
  );
}

const FaqWrapper = styled.div`
  position: relative;
`;

const HeaderWrapper = styled(Box)`
  text-align: center;
`;

const AccordionsWrapper = styled(Box)`
  background-color: ${props => props.theme.backgroundLight};
  border-radius: 20px;
  color: ${props => props.theme.light};
  max-width: 823px;
  width: 100%;
  z-index: 1;
`;

Faq.propTypes = {
  backgroundImageUrl: string.isRequired,
  faqs: arrayOf(shape({
    question: string,
    answer: string,
  }),
  ).isRequired,
};

export default Faq;
