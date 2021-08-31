import { Flex } from '@rebass/grid';
import Paragraph from 'shared-components/Typography/Paragraph';
import PropTypes from 'prop-types';
import React from 'react';
import { StyledBox, StyledCategoryShows, TextWrapper } from './styled';

function CategoryShows({ shows, description }) {
  return (
    <StyledCategoryShows>
      <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <StyledBox width={[1, 0.65, 0.65]}>
          {description && (
          <TextWrapper>
            <Paragraph text={description} variant="l" transparent />
          </TextWrapper>
          )}
        </StyledBox>
      </Flex>
    </StyledCategoryShows>
  );
}

CategoryShows.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.shape({
      squareLarge: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  })),
  description: PropTypes.string,
};

CategoryShows.defaultProps = {
  shows: [],
  description: null,
};

export default CategoryShows;
