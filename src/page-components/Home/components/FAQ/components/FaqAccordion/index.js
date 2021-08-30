import { Box, Flex } from '@rebass/grid';
import Divider from 'components/Divider';
import CollapseIcon from 'components/Icons/collapse.svg';
import ExpandIcon from 'components/Icons/expand.svg';
import Header from 'components/Typography/Header';
import { bool, string, func } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';
import FaqAnswer from '../FaqAnswer';

function FaqAccordion({ question, answer, visible, onClick }) {
  return (
    <>
      <QuestionHeader my={[spacing.s, spacing.m, spacing.m]} onClick={onClick}>
        <Box mr={[spacing.m, spacing.m, spacing.m]}>
          <Header as="h1" variant="m" text={question} />
        </Box>
        <Box width={12}>
          { visible && <CollapseIcon /> }
          { !visible && <ExpandIcon /> }
        </Box>
      </QuestionHeader>
      <FaqAnswer key={question} visible={visible} answer={answer} />
      <Divider />
    </>
  );
}

const QuestionHeader = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

FaqAccordion.propTypes = {
  question: string.isRequired,
  answer: string.isRequired,
  visible: bool.isRequired,
  onClick: func.isRequired,
};

export default FaqAccordion;
