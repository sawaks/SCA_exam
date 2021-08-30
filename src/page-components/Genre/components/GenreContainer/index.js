import { Box, Flex } from '@rebass/grid';
import BackIcon from 'components/BackIcon';
import Breadcrumbs from 'components/Breadcrumbs';
import { Mobile } from 'components/Screen';
import Header from 'components/Typography/Header';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';

import GenreGrid from '../GenreGrid';
import GenreLabel from '../GenreLabel';

const StyledCategoryContainer = styled(Flex)`
  position: relative;
`;

const GenreContainer = ({ slug, stations, name, description, setOrder }) => (
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
      <GenreLabel />
      <Header as="h1" variant="xl" text={name} linesToShow={1} mb="m" />
    </Box>
    <GenreGrid slug={slug} stations={stations} name={name} description={description} setOrder={setOrder} />
  </StyledCategoryContainer>
);

GenreContainer.propTypes = {
  name: PropTypes.string,
  slug: PropTypes.string,
  description: PropTypes.string,
  stations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    backgroundColour: PropTypes.string,
    images: PropTypes.shape({
      logo: PropTypes.string,
    }),
  })),
  setOrder: PropTypes.func,
};

GenreContainer.defaultProps = {
  name: null,
  slug: null,
  description: null,
  setOrder: null,
  stations: [],
};

export default GenreContainer;
