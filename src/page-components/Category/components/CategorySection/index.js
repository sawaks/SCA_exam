import { Box, Flex } from '@rebass/grid';
import Header from 'shared-components/Typography/Header';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import spacing from 'src/styling/spacing';

import CategoryShows from '../CategoryShows';

const StyledCategoryContainer = styled(Flex)`
  position: relative;
`;

const CategorySection = ({ shows, name, description }) => (
  <StyledCategoryContainer flexDirection="column">
    <Box px={[spacing.m, 0, 0]}>
      <Header as="h1" variant="xl" text={name} linesToShow={1} mb="m" />
    </Box>
    <CategoryShows shows={shows} description={description} />
  </StyledCategoryContainer>
);

CategorySection.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  shows: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.shape({
      squareLarge: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  })),
};

CategorySection.defaultProps = {
  name: null,
  description: null,
  shows: [],
};

export default CategorySection;
