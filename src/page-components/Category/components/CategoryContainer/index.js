import { Box, Flex } from '@rebass/grid';
import Header from 'shared-components/Typography/Header';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import spacing from 'src/styling/spacing';

import CategoriesGrid from '../CategoriesGrid';

const StyledCategoryContainer = styled(Flex)`
  position: relative;
`;

const CategoryContainer = ({ shows, name, description, onClick }) => (
  <StyledCategoryContainer flexDirection="column">
    <Box px={[spacing.m, 0, 0]}>
      <Header as="h1" variant="xl" text={name} linesToShow={1} mb="m" />
    </Box>
    <CategoriesGrid shows={shows} description={description} onClick={onClick} />
  </StyledCategoryContainer>
);

CategoryContainer.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  shows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.shape({
      squareLarge: PropTypes.shape({ url: PropTypes.string }),
    }),
  })),
  onClick: PropTypes.func,
};

CategoryContainer.defaultProps = {
  name: null,
  description: null,
  onClick: null,
  shows: [],
};

export default CategoryContainer;
