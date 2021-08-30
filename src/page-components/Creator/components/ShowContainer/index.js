import { Box, Flex } from '@rebass/grid';
import BackIcon from 'components/BackIcon';
import Breadcrumbs from 'components/Breadcrumbs';
import { Mobile } from 'components/Screen';
import Header from 'components/Typography/Header';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import spacing from 'styles/helpers/spacing';

import ShowGrid from '../ShowGrid';
import ShowLabel from '../ShowLabel';

const StyledShowContainer = styled(Flex)`
  position: relative;
`;

const ShowContainer = ({ slug, shows, name }) => (
  <StyledShowContainer flexDirection="column">
    <Mobile>
      <Box pb={spacing.l}>
        <Flex justifyContent="space-between">
          <BackIcon />
        </Flex>
      </Box>
    </Mobile>
    <Box px={[spacing.m, 0, 0]}>
      <Breadcrumbs queryType="creatorSlug" name={name} />
      <ShowLabel />
      <Header as="h1" variant="xl" text={name} linesToShow={1} mb="m" />
    </Box>
    <ShowGrid slug={slug} shows={shows} name={name} />
  </StyledShowContainer>
);

ShowContainer.propTypes = {
  name: PropTypes.string,
  slug: PropTypes.string,
  shows: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.shape({
      square: PropTypes.shape({ url: PropTypes.string }),
    }),
  })).isRequired,
};

ShowContainer.defaultProps = {
  name: null,
  slug: null,
};

export default ShowContainer;
