import React from 'react';
import { Flex } from 'components/Grid';
import { arrayOf, string } from 'prop-types';
import spacing from 'styles/helpers/spacing';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import Header from 'components/Typography/Header';
import CreatorImage from 'components/CreatorImage';
import { Mobile } from 'components/Screen';
import BackIcon from 'components/BackIcon';
import DescriptionBlock from 'components/DescriptionBlock';
import TagBlocks from '../../../../components/TagsBlock';

const StyledContainer = styled(Flex)`
  text-align: center;
  width: 100%;
  ${screen.md} {
    text-align: left;
    max-width: 443px;
  }
`;

const StationInfoContainer = ({ stationName, logo, stationCategories, description, backgroundColour }) => (
  <StyledContainer flexDirection="column">
    <Mobile>
      <Flex justifyContent="space-between" pb={spacing.l}>
        <BackIcon />
      </Flex>
    </Mobile>
    <Flex justifyContent={['center', 'center', 'flex-start']}>
      <CreatorImage imageUrl={logo || ''} backgroundColour={backgroundColour || ''} width={320} height={320} />
    </Flex>
    <Header as="h1" variant="xl" text={stationName} mb="l" />
    {description && <DescriptionBlock podcastDescription={description} />}
    <Flex mt={[spacing.m, spacing.m, spacing.l]} justifyContent={['center', 'center', 'flex-start']} flexWrap="wrap">
      {stationCategories && <TagBlocks tags={stationCategories} />}
    </Flex>
  </StyledContainer>
);

StationInfoContainer.propTypes = {
  stationName: string.isRequired,
  logo: string.isRequired,
  description: string.isRequired,
  backgroundColour: string.isRequired,
  stationCategories: arrayOf(string).isRequired,
};

export default StationInfoContainer;
