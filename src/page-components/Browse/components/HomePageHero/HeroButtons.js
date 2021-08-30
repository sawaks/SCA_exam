import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import ArrowDown from 'components/Icons/arrow-down.svg';
import screen from 'styles/helpers/media';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

const Edge = styled(Flex)`
  position: absolute;
  display: none;
  z-index: 1;
  height: 100%;
  width: 38px;
  top: 0;
  ${props => props.direction}: 0;
  opacity: 1;
  justify-content: ${props => ((props.direction === 'right') ? 'flex-end' : 'flex-start')};
  pointer-events: initial;

  ${screen.md} {
    display: flex;
  }
`;

const Button = styled.button`
  display: block;
  background: transparent;
  border: 0;
  font-size: 0;
  border-radius: 4px;
  width: 25px;
  height: 35px;
  position: absolute;
  top: calc(50%);
  opacity: 1;
  color: ${props => props.theme.primary};

  transform: translateY(-50%);
  z-index: 2;
  cursor: pointer;
  outline: none;
`;

const TransformedArrow = styled(ArrowDown)`
  transform: rotate(${props => props.rotation}deg) scale(2);
`;

const next = (sliderRef) => {
  sliderRef.current.slickNext();
  addToDataLayer({
    event: gtm.onBrowsePageHeroNavigation,
    pageType: page.browsePage,
  });
};
const previous = (sliderRef) => {
  sliderRef.current.slickPrev();
  addToDataLayer({
    event: gtm.onBrowsePageHeroNavigation,
    pageType: page.browsePage,
  });
};

export function PreviousButton({ currentSlide, sliderRef }) {
  return (
    <Edge direction="left" visible={currentSlide !== 0}>
      <Button onClick={() => previous(sliderRef)}><TransformedArrow rotation={90} /></Button>
    </Edge>
  );
}

export function NextButton({ className, sliderRef }) {
  return (
    <Edge direction="right" visible={!className.includes('slick-disabled')}>
      <Button onClick={() => next(sliderRef)}><TransformedArrow rotation={-90} /></Button>
    </Edge>
  );
}

PreviousButton.propTypes = {
  sliderRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  currentSlide: PropTypes.number,
};

PreviousButton.defaultProps = {
  currentSlide: 0,
};

NextButton.propTypes = {
  className: PropTypes.string,
  sliderRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

NextButton.defaultProps = {
  className: '',
};

