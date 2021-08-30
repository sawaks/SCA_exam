import React from 'react';
import styled from 'styled-components';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import spacing from 'styles/helpers/spacing';
import { func, number, string } from 'prop-types';
import { Flex, Box } from 'components/Grid';
import screen from 'styles/helpers/media';

const Selector = ({ setSelectedOption, selectedOption, index, title, description }) => (
  <SelectionWrapper
    flexDirection="column"
    width="90%"
    mb={[spacing.l, spacing.m]}
    selected={selectedOption === index}
    onClick={() => setSelectedOption(index)}
  >
    <SelectedBar selected={selectedOption === index} />
    <Box pl={[0, spacing.l]}>
      <Box mt={[0, 0, spacing.m]}>
        <Header as="h1" variant="xl" mb="m" text={title} />
      </Box>
      <Description
        text={description}
        variant="l"
        mb="l"
        transparent
      />
    </Box>
  </SelectionWrapper>
);

const SelectionWrapper = styled(Flex)`
  cursor: pointer;
  position: relative;
  justify-content: center;
  color: ${props => (props.selected ? 'inherit' : '#A5A5A5')};
  width: 40%;
  ${screen.md} {
    border-bottom: 1px solid #ffffff1c; 
    width: 90%;
  }
`;

const SelectedBar = styled.div`
  display:none;
  ${screen.md} {
    position: absolute;
    height: 70%;
    border-radius: 6px;
    display: ${props => (props.selected ? 'block' : 'none')};
    border: 3px solid ${props => props.theme.primary};
  }
`;

const Description = styled(Paragraph)`
  display:none;
  ${screen.md} {
    display:block;
  }
`;

Selector.propTypes = {
  index: number.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  setSelectedOption: func.isRequired,
  selectedOption: number.isRequired,
};

export default Selector;
