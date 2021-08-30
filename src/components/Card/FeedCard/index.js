import EpisodeProgress from 'components/EpisodeProgress';
import { Flex } from 'components/Grid';
import ClockIcon from 'components/Icons/clock.svg';
import ExplicitIcon from 'components/Icons/explicitTag.svg';
import MoreOptions from 'components/MoreOptions';
import Header from 'components/Typography/Header';
import { bool, number, oneOf, string } from 'prop-types';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addOrUpdateEpisode } from 'store/actions/listened-episodes';
import { openPlayer } from 'store/actions/player-overlay';
import { markAsPlayed } from 'store/actions/userInteractions';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import gtm from 'utilities/GTM/gtmTags';
import page from 'utilities/GTM/pageTags';

import addToDataLayer from 'utilities/helpers/dataLayer';
import { formatSecondsToTime } from 'utilities/helpers/dateTime';

const FeedWrapper = styled(Flex)`
  width: 100%;
  margin: ${spacing.m} 0;
  &:first-child {
    margin-top: 0;
  }
  ${screen.md} {
    margin: ${spacing.l} 0;
  }
`;

const StyledCard = styled(Flex)`
  background-color: ${props => props.bgColour || props.theme.primary};
  width: 100%;
  border-radius: 16px;
  padding: ${spacing.m};
  overflow: hidden;
  position: relative;
`;

const CardWrapper = styled(Flex)`
  background-color: ${props => props.bgColour || props.theme.primary};
  border-radius: 16px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  width: 100%;
  ${screen.md} {
    margin-right: ${spacing.l};
    width: 65%;
  }
`;

const Gradient = styled.div`
  opacity: 0.3;
  background-image: linear-gradient(to bottom, rgba(4, 8, 32, 0), #040820);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 55%;
`;

const TextWrapper = styled(Flex)`
  z-index: 1;
  padding-bottom: 2px;
  height: 130px;
  width: 65%;
  ${screen.md} {
    height: 176px;
  }
`;

const ShowImage = styled.img`
  width: auto;
  height: 130px;
  border-radius: 8px;
  box-shadow: ${props => (props.loadingProgress ? 'none' : '0 4px 8px 0 rgba(0, 0, 0, 0.5)')};
  z-index: 1;
  opacity: ${props => (props.loading ? 0 : 1)};
  margin-right: ${spacing.m};
  ${screen.md} {
    width: 176px;
    height: 176px;
  }
`;

const ShowTitle = styled.p`
  text-transform: uppercase;
  margin: ${spacing.s} 0;
  font-size: 10px;
  opacity: 0.7;
  ${screen.md} {
    font-size: 12px;
  }
`;

/* stylelint-disable property-no-vendor-prefix */
/* stylelint-disable value-no-vendor-prefix */
const Description = styled.p`
  margin: 0;
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  ${screen.md} {
    font-size: 16px;
    -webkit-line-clamp: 8;
  }
`;

const TextPlaceHolderWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 41px;
  ${screen.md} {
    height: 16px;
    height: 148px;
  }
`;

const TextPlaceHolder = styled.div`
  height: 14px;
  background-color: grey;
  width: ${props => `${props.length}%`};
  opacity: 0.4;
  margin: ${spacing.s} 0;
  ${screen.md} {
    height: 16px;
  }
`;

const CategoryTag = styled.p`
  text-transform: uppercase;
  font-size: 10px;
  opacity: 0.4;
  margin: 0 0 0 ${spacing.m};
  background-color: ${props => (props.loadingProgress ? 'grey' : 'transparent')};
  min-width: 140px;
  height: 12px;
  ${screen.md} {
    font-size: 12px;
  }
`;

const Duration = styled.p`
  font-size: 10px;
  opacity: 0.4;
  margin: 0 0 0 ${spacing.s};
  background-color: ${props => (props.loadingProgress ? 'grey' : 'transparent')};
  min-width: 49px;
  height: 12px;
  ${screen.md} {
    font-size: 12px;
  }
`;

const DescriptionWrapper = styled(Flex)`
  width: 100%;
  margin-top: ${spacing.m};
  ${screen.md} {
    margin-top: ${spacing.s};
    width: 35%;
    max-height: 194px;
  }
`;

const MoreOptionsWrapper = styled.div`
  margin-left: auto;
`;

const PlayWrapper = styled.div`
  height: 28px;
  width: 28px;
  border-radius: 50%;
  background-color: rgba(4, 8, 32, 0.3);
  position: absolute;
  right: ${spacing.m};
  ${screen.md} {
    height: 40px;
    width: 40px;
  }
`;

const FeedCard = ({
  audioUrl,
  category,
  colour,
  currentTimeSeconds,
  description,
  durationSeconds,
  episodeId,
  episodeSlug,
  episodeSeason,
  imageUrl,
  isActive,
  isCompleted,
  isExplicit,
  index,
  loading = false,
  origin,
  season,
  showName,
  showId,
  slug,
  title,
  feedCategory,
}) => {
  const dispatch = useDispatch();
  const { userId } = useSelector(({ profile }) => ({ userId: profile.userId }), shallowEqual);

  const handleClick = () => {
    addToDataLayer({
      event: gtm.myFeedShowPlay,
      pageType: page.myFeedPage,
      category,
      podcastName: showName,
      season,
      episodeId,
      streamingUrl: audioUrl,
    });

    dispatch(openPlayer({
      episodeId,
      episodePlayHeadPosition: currentTimeSeconds,
      episodeDuration: durationSeconds,
      episodeOrigin: origin,
    }));
  };

  const handleMoreOptionsClick = async () => {
    await dispatch(addOrUpdateEpisode(userId, {
      id: episodeId,
      slug: episodeSlug,
      season: episodeSeason,
      durationSeconds,
      showId,
      showSlug: slug,
      playheadPosition: isCompleted ? 0 : currentTimeSeconds,
      isMarkedAsPlayed: !isCompleted,
    }));
    dispatch(markAsPlayed());
  };

  return (
    <FeedWrapper flexDirection={['column', 'column', 'row']}>
      <CardWrapper bgColour={colour}>
        <StyledCard key={episodeId} bgColour={colour} onClick={handleClick} data-test={loading || `feed-episode-${index}`} data-test-feed-category={feedCategory}>
          {!loading && <ShowImage src={imageUrl || null} /> }
          <TextWrapper flexDirection="column" justifyContent="flex-end">
            <ShowTitle>{showName}</ShowTitle>
            <Header as="h3" variant="l" text={title} linesToShow={2} />
          </TextWrapper>
          <PlayWrapper>
            <EpisodeProgress
              currentTimeSeconds={currentTimeSeconds}
              durationSeconds={durationSeconds}
              isActive={isActive}
              isCompleted={isCompleted}
              isLoading={loading}
              playerVisible={loading}
            />
          </PlayWrapper>
          <Gradient />
        </StyledCard>
      </CardWrapper>
      <DescriptionWrapper
        justifyContent="space-between"
        flexDirection="column"
        pb={spacing.m}
        px={[spacing.s, 0]}
      >
        <Description>{description}</Description>
        {loading && (
          <TextPlaceHolderWrapper>
            <TextPlaceHolder length="80" />
            <TextPlaceHolder length="100" />
            <TextPlaceHolder length="90" />
            <TextPlaceHolder length="85" />
            <TextPlaceHolder length="45" />
          </TextPlaceHolderWrapper>
        )}
        <Flex mt={spacing.m} alignItems="center">
          {isExplicit && (
            <Flex mr={spacing.m}>
              <ExplicitIcon />
            </Flex>
          )}
          <ClockIcon />
          <Flex alignItems="center" width="100%">
            <Duration loadingProgress={loading}>
              {loading || formatSecondsToTime(durationSeconds)}
            </Duration>
            <CategoryTag loadingProgress={loading}>
              {loading || `#${category}`}
            </CategoryTag>
            <MoreOptionsWrapper
              onClick={() => addToDataLayer({
                event: gtm.myFeedShowThreeDots,
                pageType: page.myFeedPage,
              })}
            >
              <MoreOptions
                disable={false}
                dropdownId={episodeId}
                isActive={isActive}
                isShowPage={false}
                onClick={handleMoreOptionsClick}
                showSlug={slug}
                showText="Go to show"
                text={isCompleted ? 'Mark as not played' : 'Mark as played'}
                visible
              />
            </MoreOptionsWrapper>
          </Flex>
        </Flex>
      </DescriptionWrapper>
    </FeedWrapper>
  );
};

export const feedCardPropTypes = {
  audioUrl: string,
  category: string,
  colour: string,
  currentTimeSeconds: number,
  description: string,
  durationSeconds: number,
  episodeId: string,
  episodeSeason: number,
  episodeSlug: string,
  feedCategory: string,
  imageUrl: string,
  index: number,
  isActive: bool,
  isCompleted: bool,
  isExplicit: bool,
  loading: bool,
  origin: oneOf(['default', 'myPlaylist', 'curatedPlaylist', 'topFeed', 'bottomFeed']),
  season: number,
  showId: string,
  showName: string,
  slug: string,
  title: string,
};

FeedCard.propTypes = feedCardPropTypes;

FeedCard.defaultProps = {
  audioUrl: '',
  category: '',
  colour: '',
  currentTimeSeconds: 0,
  description: '',
  durationSeconds: 0,
  episodeId: '',
  episodeSeason: null,
  episodeSlug: '',
  feedCategory: '',
  imageUrl: '',
  index: 0,
  isActive: false,
  isCompleted: false,
  isExplicit: false,
  loading: false,
  origin: 'default',
  season: null,
  showId: '',
  showName: '',
  slug: '',
  title: '',
};

export default FeedCard;
