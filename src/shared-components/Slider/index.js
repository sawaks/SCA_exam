import PropTypes from 'prop-types';
import React from 'react';
import ReactSlick from 'react-slick';
import styled from 'styled-components';
import screen from 'src/styling/screen';
import spacing from 'src/styling/spacing';
import Divider from 'shared-components/Divider';

import { NextButton, PrevButton } from './Buttons';
import Heading from './Heading';

const xlBreakPoint = (cardSize) => {
  switch (cardSize) {
    case 'l':
      return {
        slidesToScroll: 2,
        slidesToShow: 2,
      };
    case 'm':
      return {
        slidesToScroll: 3,
        slidesToShow: 3,
      };
    default:
      return {
        slidesToScroll: 4,
        slidesToShow: 4,
      };
  }
};

const lBreakPoint = (cardSize) => {
  switch (cardSize) {
    case 'l':
      return {
        slidesToScroll: 1,
        slidesToShow: 1,
      };
    case 'm':
    default:
      return {
        slidesToScroll: 3,
        slidesToShow: 3,
      };
  }
};

const CardsSection = styled.div`
  position: relative;
  margin: ${spacing.l} 0;

  ${screen.tablet} {
    margin: ${spacing.l} 0 ${spacing.xl};
   }
`;

function Slider({ children, title, cardSize, viewAll, viewAllGtm, noDivider, showArrows }) {
  const settings = {
    dots: false,
    infinite: false,
    variableWidth: true,
    swipeToSlide: true,
    ...xlBreakPoint(cardSize),
    responsive: [
      {
        breakpoint: 832,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1060,
        settings: lBreakPoint(cardSize),
      },
    ],
    nextArrow: <NextButton />,
    prevArrow: <PrevButton />,
    arrows: showArrows,
  };
  return (
    <div>
      <Heading title={title} viewAll={viewAll} viewAllGtm={viewAllGtm} />
      {!noDivider && <Divider />}
      <CardsSection>
        <ReactSlick {...settings}>
          {children}
        </ReactSlick>
      </CardsSection>
    </div>
  );
}

Slider.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  /* This should match the card size. Eg. CardM02 => m, CardS04 => s */
  cardSize: PropTypes.oneOf(['m', 'l']),
  /* The same shape as next/Link. It doesn't render anything if it is not provided */
  viewAll: PropTypes.shape({
    as: PropTypes.string,
    pathname: PropTypes.string,
    query: PropTypes.objectOf(PropTypes.any),
  }),
  viewAllGtm: PropTypes.func,
  noDivider: PropTypes.bool,
  gtmViewAllEvent: PropTypes.string,
  showArrows: PropTypes.bool,
};

Slider.defaultProps = {
  viewAll: null,
  viewAllGtm: null,
  cardSize: null,
  title: null,
  noDivider: false,
  gtmViewAllEvent: '',
  showArrows: true,
};

function areEqual() {
  return true;
}

export default React.memo(Slider, areEqual);
