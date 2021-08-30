
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex, Box } from 'components/Grid';
import spacing from 'styles/helpers/spacing';
import ArrowIcon from 'components/Icons/arrow-down.svg';
import screen from 'styles/helpers/media';
import Divider from '../Divider';
import Button from '../Button';

const StyledWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const StyledItem = styled.div`
  overflow: hidden;
  height: auto;
  max-height: ${props => (props.open ? 'none' : 0)};
  padding-bottom: ${props => (props.open ? spacing.l : 0)};
`;

const StyledTitle = styled(Flex)`
  cursor: pointer;
  padding: ${spacing.l} 0;
  opacity: ${props => (props.open ? 1 : 0.5)};
`;

const StyledContent = styled.div`
   margin: ${spacing.m} 0 ${spacing.l};
   max-height: ${props => (props.expanded ? 'none' : '770px')};
   overflow: hidden;
    ${screen.md} {
       margin: ${spacing.l} 0;
       max-height: ${props => (props.expanded ? 'none' : '786px')};
    }
`;

const StyledArrowIcon = styled(Box)`
  padding-right: ${spacing.m};
  opacity: ${props => (props.open ? 1 : 0.5)};
  svg {
    width: 12px;
    transform: ${props => (props.open ? 'rotate(-180deg)' : 'rotate(0deg)')};
    transition: transform 0.5s;
  }
`;

const Accordion = ({ TitleComponent, children, id, isOpen, loading, showExpansion, openCallback = null }) => {
  const [accordions, setAccordion] = useState({});
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const prevState = useRef();

  useEffect(() => {
    setAccordion({ [id]: isOpen, ...accordions });
  }, [isOpen]);

  useEffect(() => {
    prevState.current = accordions;
  });

  const toggleAccordion = (e, clickedId) => {
    setAccordion({ [clickedId]: !prevState.current[clickedId] });
    if (accordions[id]) {
      setExpandedAccordion(false);
    }
    // only run open callback when opening accordion
    if (openCallback && !accordions[id]) {
      openCallback();
    }
  };

  return (
    <StyledWrapper>
      <Divider />
      <StyledTitle onClick={e => toggleAccordion(e, id)} open={accordions[id]} justifyContent="space-between">
        <Flex justifyContent="flex-start" alignItems="center">
          <StyledArrowIcon open={accordions[id]}>
            <ArrowIcon />
          </StyledArrowIcon>
          {TitleComponent}
        </Flex>
      </StyledTitle>
      <Divider />
      <StyledItem open={accordions[id]}>
        <Flex flexDirection="column" justifyContent="center">
          <StyledContent expanded={expandedAccordion}>
            {children}
          </StyledContent>
          {showExpansion && !expandedAccordion && !loading && (
          <Button
            as="button"
            text="View More"
            variant="mono"
            onClick={() => setExpandedAccordion(true)}
          />
          )}
        </Flex>
      </StyledItem>
    </StyledWrapper>
  );
};

Accordion.propTypes = {
  TitleComponent: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  loading: PropTypes.bool,
  showExpansion: PropTypes.bool,
  openCallback: PropTypes.func,
};

Accordion.defaultProps = {
  isOpen: false,
  loading: false,
  showExpansion: true,
  openCallback: null,
};

export default Accordion;
