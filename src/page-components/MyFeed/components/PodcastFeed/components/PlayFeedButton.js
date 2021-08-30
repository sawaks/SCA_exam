import Button from 'components/Button';
import Play from 'components/Icons/play.svg';
import get from 'lodash/get';
import PropTypes, { shape } from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import addToDataLayer from 'utilities/helpers/dataLayer';
import page from 'utilities/GTM/pageTags';
import gtm from 'utilities/GTM/gtmTags';
import { openPlayer } from 'store/actions/player-overlay';
import { EPISODE_ORIGIN } from 'utilities/constants';

const PlayButton = styled(Button)`
  min-width: 40px;
  padding-left: 4px;

  ${screen.md} {
    justify-content: center;
    min-width: 310px;
    padding-left: 2px;
  }
`;

const PlayFeedButton = ({ feed }) => {
  const episodeId = get(feed, '[0].id', '');
  const streamingUrl = get(feed, '[0].audioUrl');
  const season = get(feed, '[0].season');
  const podcastName = get(feed, '[0].show.name', '');
  const category = get(feed, '[0].show.categories[0].name', '');
  const currentTimeSeconds = get(feed, '[0].currentTimeSeconds', null);
  const durationSeconds = get(feed, '[0].durationSeconds', null);
  const dispatch = useDispatch();

  const handleClick = () => {
    addToDataLayer({
      event: gtm.myFeedPlayMyFeed,
      category,
      podcastName,
      season,
      episodeId,
      streamingUrl,
      pageType: page.myFeedPage,
    });

    dispatch(openPlayer({
      episodeId,
      episodePlayHeadPosition: currentTimeSeconds,
      episodeDuration: durationSeconds,
      episodeOrigin: EPISODE_ORIGIN.topFeed,
    }));
  };

  return (
    <PlayButton
      key={episodeId}
      variant="primary"
      icon={<Play />}
      text="play my feed"
      mobileText=""
      onClick={handleClick}
      data-test="play-all"
    />
  );
};

PlayFeedButton.propTypes = {
  feed: PropTypes.arrayOf(shape).isRequired,
};

export default PlayFeedButton;
