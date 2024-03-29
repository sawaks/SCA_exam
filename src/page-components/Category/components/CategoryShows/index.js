import { Flex } from '@rebass/grid';
import Paragraph from 'shared-components/Typography/Paragraph';
import PropTypes from 'prop-types';
import React from 'react';
import { StyledBox, StyledCategoryShows, TextWrapper } from './styled';
import ShowCard from 'src/shared-components/ShowCard';
import ShowNum from 'src/shared-components/ShowNum';
import { CardGrid } from './styled';

function CategoryShows({ shows, description }) {
  return (
    <StyledCategoryShows>
      {shows && <ShowNum productsNumber={shows.length} />}
      <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <StyledBox>
          {description && (
            <TextWrapper>
              <Paragraph text={description} variant="l" transparent />
            </TextWrapper>
          )}
        </StyledBox>
        <CardGrid>
          {shows && (shows.map(show => (
            <ShowCard key={show.id} imageUrl={show?.images?.squareLarge?.url || ""} title={show.name} description={show.description} />
          )))}
        </CardGrid>
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
