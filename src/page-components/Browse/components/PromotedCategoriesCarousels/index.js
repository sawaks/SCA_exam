import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';

import CategoryCarousel from './CategoryCarousel';

const PromotedCategoriesCarousels = ({ promotedCategories }) => (
  <>
    {promotedCategories.map(category => (
      <CarouselWrapper key={category.slug}>
        <CategoryCarousel category={category} />
      </CarouselWrapper>
    ))}
  </>
);

const CarouselWrapper = styled.div`
  max-height: 310px;

  ${screen.sm}{
    margin-bottom: 50px;
  }

  ${screen.md}{
    margin-bottom: 162px;
  }
`;

PromotedCategoriesCarousels.propTypes = {
  promotedCategories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    shows: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })),
  })).isRequired,
};

export default PromotedCategoriesCarousels;
