import { Box, Flex } from '@rebass/grid';
import BackIcon from 'components/BackIcon';
import Breadcrumbs from 'components/Breadcrumbs';
import { Mobile } from 'components/Screen';
import Header from 'components/Typography/Header';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';

import CategoriesGrid from '../CategoriesGrid';
import CategoryLabel from '../CategoryLabel';

const StyledCategoryContainer = styled(Flex)`
  position: relative;
`;

const CategoryContainer = ({ id, slug, shows, name, description, setOrder }) => (
  <StyledCategoryContainer flexDirection="column">
    <Mobile>
      <Box pb={spacing.l} px={[spacing.m, 0, 0]}>
        <Flex justifyContent="space-between">
          <BackIcon />
        </Flex>
      </Box>
    </Mobile>
    <Box px={[spacing.m, 0, 0]}>
      <Breadcrumbs name={name} />
      <CategoryLabel />
      <Header as="h1" variant="xl" text={name} linesToShow={1} mb="m" />
    </Box>
    <CategoriesGrid id={id} slug={slug} shows={shows} name={name} description={description} setOrder={setOrder} />
  </StyledCategoryContainer>
);

CategoryContainer.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  slug: PropTypes.string,
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
  setOrder: PropTypes.func,
};

CategoryContainer.defaultProps = {
  name: null,
  slug: null,
  description: null,
  setOrder: null,
  shows: [],
};

export default CategoryContainer;
