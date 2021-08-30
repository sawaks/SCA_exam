import React from 'react';
import { Box, Flex } from 'components/Grid';
import { string, arrayOf, func, bool } from 'prop-types';
import spacing from 'styles/helpers/spacing';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import Header from 'components/Typography/Header';
import CreatorImage from 'components/CreatorImage';
import { Mobile } from 'components/Screen';
import BackIcon from 'components/BackIcon';
import Breadcrumbs from 'components/Breadcrumbs';
import FavouriteButton from 'components/FavouriteButton';
import DescriptionBlock from 'components/DescriptionBlock';
import SocialShareButton from 'components/Social/SocialShareButton';
import TagBlocks from '../../../../components/TagsBlock';

const StyledContainer = styled(Flex)`
  text-align: center;
  width: 100%;
  ${screen.md} {
    text-align: left;
    max-width: 443px;
  }
`;

const FavouriteButtonWrapper = styled.div`
  width: 100%;
  ${screen.lg} {
    width: auto;
  }
`;

const StationInfoContainer = ({ stationName, logo, stationCategories, description, backgroundColour, isFavouriteStation, addFavouriteStation, removeFavouriteStation }) => (
  <StyledContainer flexDirection="column">
    <Mobile>
      <Flex justifyContent="space-between" pb={spacing.l}>
        <BackIcon />
      </Flex>
    </Mobile>
    <Flex justifyContent={['center', 'center', 'flex-start']}>
      <CreatorImage imageUrl={logo || ''} backgroundColour={backgroundColour || ''} width={320} height={320} />
    </Flex>
    <Box py={[spacing.m, spacing.m, spacing.l]}>
      <Breadcrumbs name={stationName} />
    </Box>
    <Header as="h1" variant="xl" text={stationName} mb="l" />
    <Flex>
      <FavouriteButtonWrapper data-test="station-favourite">
        <FavouriteButton
          isFav={isFavouriteStation}
          isMobile
          onFavouriteClick={addFavouriteStation}
          onUnfavouriteClick={removeFavouriteStation}
        />
      </FavouriteButtonWrapper>
      <Box ml="11px">
        <SocialShareButton episodeTitle={stationName} shareItem="station" location="show-details" btnType="secondary" />
      </Box>
    </Flex>
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
  isFavouriteStation: bool.isRequired,
  stationCategories: arrayOf(string).isRequired,
  addFavouriteStation: func.isRequired,
  removeFavouriteStation: func.isRequired,
};

export default StationInfoContainer;
