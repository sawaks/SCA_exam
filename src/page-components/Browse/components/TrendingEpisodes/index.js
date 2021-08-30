import EpisodeCard from 'components/Card/EpisodeCard';
import Slider from 'components/Slider';
import combineWithPersonalisedData from 'utilities/helpers/combineWithPersonalisedData';
import { shape, arrayOf } from 'prop-types';
import React, { useEffect, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { refreshEpisodeListCompleted } from 'store/actions/userInteractions';
import { EPISODE_ORIGIN } from 'utilities/constants';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import usePrevious from 'utilities/helpers/usePrevious';

const TrendingEpisodes = ({ trendingEpisodes }) => {
  const dispatch = useDispatch();
  const refreshEpisodeList = useSelector(state => state.userInteractions.refreshEpisodeList, shallowEqual);
  const audioPlayerUrl = useSelector(({ audioPlayer }) => (audioPlayer.sourceUrl && audioPlayer.playing), shallowEqual);
  const sessionInfo = useSelector(({ userSessionInfo }) => userSessionInfo.listenedEpisodes, shallowEqual);

  const previousRefresh = usePrevious(refreshEpisodeList);
  const episodes = useMemo(() => combineWithPersonalisedData(trendingEpisodes, sessionInfo), [Object.keys(sessionInfo).length, refreshEpisodeList]);

  useEffect(() => {
    if (!previousRefresh && refreshEpisodeList) {
      dispatch(refreshEpisodeListCompleted());
    }
  }, [refreshEpisodeList]);

  const handleOnClick = (i, episode) => {
    addToDataLayer({
      event: gtm.onBrowsePageTrendingEpisodesClicked,
      tilePosition: i,
      category: episode?.show?.categories[0]?.name,
      podcastName: episode?.show?.name,
      episodeNumber: episode?.episode,
    });
  };

  return (
    <>
      <Slider
        title="Trending episodes"
        cardSize="m"
        gtmBrowseEvent={gtm.onBrowsePageTrendingEpiosdes}
        gtmViewAllEvent={gtm.onBrowsePageTrendingEpisodesViewAll}
      >
        {episodes.map((episode, i) => (
          <EpisodeCard
            currentTimeSeconds={episode.time}
            description={episode.description}
            durationSeconds={episode.durationSeconds}
            episodeId={episode.id}
            episode={episode.episode}
            imageUrl={episode.imageUrl}
            index={i}
            isCompleted={episode.isCompleted}
            isExplicit={episode.contentRating === 'Explicit'}
            isNew={false}
            isTrendingEpisodes
            key={episode.id}
            noBorder
            onClick={() => handleOnClick(i, episode)}
            origin={EPISODE_ORIGIN.default}
            playing={episode.audioUrl === audioPlayerUrl}
            publishedDate={episode.publishedUtc}
            season={episode.season}
            showId={episode?.show?.id}
            showSlug={episode?.show?.slug}
            title={episode.title}
            maxWidthMobile="330px"
            maxWidthDesktop="437px"
            data-test={`trending-episode-${i}`}
          />
        ))}
      </Slider>
    </>
  );
};

TrendingEpisodes.propTypes = {
  trendingEpisodes: arrayOf(shape).isRequired,
};

export default TrendingEpisodes;
