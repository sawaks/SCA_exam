import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import addToDataLayer from 'utilities/helpers/dataLayer';
import { Flex } from '@rebass/grid';
import ArrowDown from 'components/Icons/arrow-down.svg';
import screen from 'styles/helpers/media';

const Edge = styled(Flex)`
  position: absolute;
  display: none;
  z-index: 1;
  height: 100%;
  width: 38px;
  top: 0;
  ${props => props.direction}: 0;
  opacity: ${props => (props.visible ? 1 : 0)};
  justify-content: ${props => ((props.direction === 'right') ? 'flex-end' : 'flex-start')};
  pointer-events: ${props => (props.visible ? 'initial' : 'none')};

  ${screen.md} {
    display: flex;
  }
`;

const Button = styled.button`
  display: block;
  background: ${props => props.theme.background};
  border: 0;
  font-size: 0;
  border-radius: 4px;
  width: 25px;
  height: 35px;
  position: absolute;
  top: calc(50%);
  color: ${props => props.theme.primary};

  transform: translateY(-50%);
  z-index: 2;
  cursor: pointer;
  outline: none;
`;

const TransformedArrow = styled(ArrowDown)`
  transform: rotate(${props => props.rotation}deg) scale(1.4);
`;

const handleClick = (onClick, direction, event) => {
  if (event) {
    addToDataLayer({
      event,
      direction,
    });
  }
  onClick();
};

export function PrevButton({ currentSlide, onClick, gtmBrowseEvent }) {
  return (
    <Edge direction="left" visible={currentSlide !== 0}>
      <Button onClick={() => handleClick(onClick, 'previous', gtmBrowseEvent)}><TransformedArrow rotation={90} /></Button>
    </Edge>
  );
}

export function NextButton({ onClick, className, gtmBrowseEvent }) {
  return (
    <Edge direction="right" visible={!className.includes('slick-disabled')}>
      <Button onClick={() => handleClick(onClick, 'next', gtmBrowseEvent)}><TransformedArrow rotation={-90} /></Button>
    </Edge>
  );
}

PrevButton.propTypes = {
  onClick: PropTypes.func,
  currentSlide: PropTypes.number,
  gtmBrowseEvent: PropTypes.string,
};

PrevButton.defaultProps = {
  onClick: null,
  currentSlide: undefined,
  gtmBrowseEvent: '',
};

NextButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  gtmBrowseEvent: PropTypes.string,
};

NextButton.defaultProps = {
  onClick: null,
  className: '',
  gtmBrowseEvent: '',
};

