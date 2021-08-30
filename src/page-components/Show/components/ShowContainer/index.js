import { Box, Flex } from '@rebass/grid';
import BackIcon from 'components/BackIcon';
import Breadcrumbs from 'components/Breadcrumbs';
import { Desktop, Mobile } from 'components/Screen';
import PlayPreview from 'components/Trailer/components/PlayPreviewButton';
import Header from 'components/Typography/Header';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import get from 'lodash/get';
import CreatorImage from '../../../../components/CreatorImage';
import DescriptionBlock from '../../../../components/DescriptionBlock';
import FavouriteShowButton from '../FavouriteShowButton';
import RelatedShows from '../RelatedShows';

import ShareIconDropDown from '../ShareIconDropDown';
import TagBlocks from '../../../../components/TagsBlock';

const StyledShowContainer = styled(Flex)`
  position: relative;
`;

const StyledHeaderText = styled(Box)`
  text-align: center;
  width: 100%;
   ${screen.md} {
      text-align: left;
      max-width: 394px;
   }
`;

const ButtonWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  ${screen.md} {
    flex-direction: column;
    align-items: start;
  }
  ${screen.lg} {
    flex-direction: row;
  }
`;

const FavouriteWrapper = styled(Box)`
  margin: 0;
  ${screen.md} {
    margin: ${spacing.s} 0 0 0;
  }
  ${screen.lg} {
    margin: 0;
  }
`;

const ShowContainer = ({ showContents, condenseVersion, episodeCount }) => {
  const {
    id: showId,
    slug,
    name: showName,
    description,
    showType,
    images: imageUrl,
    creators,
    playlistCategories,
    categories,
    trailerEpisode,
    audioUrl,
  } = showContents;

  const previewAudioUrl = audioUrl || get(trailerEpisode, 'audioUrl', null);

  return (
    <StyledShowContainer flexDirection="column">
      <Mobile>
        <Flex justifyContent="space-between" pb={spacing.l}>
          <BackIcon />
          <ShareIconDropDown showName={showName} episodeCount={episodeCount} />
        </Flex>
      </Mobile>
      <Flex justifyContent={['center', 'center', 'flex-start']}>
        <CreatorImage imageUrl={imageUrl?.squareLarge?.url} title={showName} />
      </Flex>
      <Box py={[spacing.m, spacing.m, spacing.l]}>
        <Breadcrumbs name={showName} />
      </Box>
      <StyledHeaderText pb={condenseVersion ? [spacing.m, spacing.m, spacing.xs] : '0'}>
        <Header as="h1" variant="xl" text={showName} mb="l" />
      </StyledHeaderText>
      {condenseVersion && (
        <Flex justifyContent={['center', 'center', 'flex-start']} pb={[spacing.l, spacing.l, spacing.m]}>
          <ButtonWrapper>
            {previewAudioUrl && <PlayPreview btnText="Preview" minWidthMobile="165px" audioUrl={previewAudioUrl} />}
            <Box pl={previewAudioUrl && spacing.m} pr={spacing.m}>
              <FavouriteWrapper>
                <FavouriteShowButton id={showId} name={showName} slug={slug} type={showType} />
              </FavouriteWrapper>
            </Box>
          </ButtonWrapper>
          <Desktop>
            <ShareIconDropDown showName={showName} />
          </Desktop>
        </Flex>
      )}
      <Box width={[1, 0.95]}>
        {/* show description */}
        <DescriptionBlock podcastDescription={description} />
        <Flex justifyContent={['center', 'center', 'flex-start']} flexWrap="wrap">
          {playlistCategories && <TagBlocks tags={playlistCategories} />}
        </Flex>
        {condenseVersion && (
          <Desktop>
            <RelatedShows
              creators={creators}
              categories={categories}
            />
          </Desktop>
        )}
      </Box>
    </StyledShowContainer>
  );
};
ShowContainer.propTypes = {
  showContents: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    showType: PropTypes.string,
    images: PropTypes.shape({
      bannerLarge: PropTypes.shape({ url: PropTypes.string }),
      bannerSmall: PropTypes.shape({ url: PropTypes.string }),
      squareSmall: PropTypes.shape({ url: PropTypes.string }),
      squareLarge: PropTypes.shape({ url: PropTypes.string }),
    }),
    creators: PropTypes.arrayOf(PropTypes.object),
    playlistCategories: PropTypes.arrayOf(PropTypes.string),
    categories: PropTypes.arrayOf(PropTypes.object),
    trailerEpisode: PropTypes.shape({
      audioUrl: PropTypes.string,
    }),
    audioUrl: PropTypes.string,
  }).isRequired,
  episodeCount: PropTypes.number,
  condenseVersion: PropTypes.bool,
};

ShowContainer.defaultProps = {
  episodeCount: null,
  condenseVersion: false,
};

export default ShowContainer;

