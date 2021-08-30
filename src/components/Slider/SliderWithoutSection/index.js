import PropTypes from 'prop-types';
import React from 'react';
import ReactSlick from 'react-slick';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import addToDataLayer from 'utilities/helpers/dataLayer';
import Divider from 'components/Divider';

import { NextButton, PrevButton } from '../Buttons';
import Heading from '../Heading';

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

const handleChange = (current, children, gtmBrowseEvent, gtmViewAllEvent) => {
  const endOfCarousel = current + 1 >= children.length;
  if (gtmBrowseEvent || gtmViewAllEvent) {
    if (gtmViewAllEvent && endOfCarousel) {
      addToDataLayer({ event: gtmViewAllEvent });
    } else if (gtmBrowseEvent) {
      addToDataLayer({ event: gtmBrowseEvent });
    }
  }
};

function SliderWithoutSection({ children, title, cardSize, viewAll, viewAllGtm, noDivider, gtmBrowseEvent, gtmViewAllEvent, showArrows }) {
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
    afterChange: current => handleChange(current, children, gtmBrowseEvent, gtmViewAllEvent),
    nextArrow: <NextButton gtmBrowseEvent={gtmBrowseEvent} />,
    prevArrow: <PrevButton gtmBrowseEvent={gtmBrowseEvent} />,
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

const CardsSection = styled.div`
  position: relative;
  margin: ${spacing.l} 0;

  ${screen.md} {
    margin: ${spacing.l} 0 ${spacing.xl};
   }
`;

SliderWithoutSection.propTypes = {
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
  gtmBrowseEvent: PropTypes.string,
  gtmViewAllEvent: PropTypes.string,
  showArrows: PropTypes.bool,
};

SliderWithoutSection.defaultProps = {
  viewAll: null,
  viewAllGtm: null,
  cardSize: null,
  title: null,
  noDivider: false,
  gtmBrowseEvent: '',
  gtmViewAllEvent: '',
  showArrows: true,
};

function areEqual() {
  return true;
}

export default React.memo(SliderWithoutSection, areEqual);
