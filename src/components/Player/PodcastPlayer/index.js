import Cookie from 'js-cookie';
import get from 'lodash/get';
import React, { useEffect, useMemo, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { CONTENT_TYPE } from 'utilities/constants';
import PodcastPlayerUI from './components/PodcastPlayerUI';

function PodcastPlayer() {
  const [displayDownloadBanner, setDisplayDownloadBanner] = useState(false);

  // Retrieve episode data for analytics
  const episode = useSelector(state => state.episode, shallowEqual);
  const analyticsData = useMemo(() => {
    const showCategories = get(episode, 'show.categories', null);
    const getFirstCategory = showCategories ? showCategories[0] : null;
    const getFirstCategoryName = get(getFirstCategory, 'name', null);
    return {
      pageType: 'show',
      showName: get(episode, 'show.name', null),
      showCategory: getFirstCategoryName,
      season: get(episode, 'season', null),
      episodeNumber: get(episode, 'episode', null),
      contentType: get(episode, 'contentType', null),
      streamingURL: get(episode, 'audioUrl', null),
    };
  }, [episode.id]);

  // Get background show image
  const backgroundUrl = useSelector((state) => {
    const { userSessionInfo } = state;
    const episodeBgImage = episode?.show?.images?.background?.url;
    const showId = episode?.show?.id;
    const playerBgImage = userSessionInfo?.shows[showId]?.playerBgImage;
    return playerBgImage || episodeBgImage;
  }, shallowEqual);

  useEffect(() => {
    const foundSmartBannerCookie = Cookie.getJSON('SmartBannerCookie');
    if (!foundSmartBannerCookie) {
      setDisplayDownloadBanner(true);
    }
  }, []);

  const music = episode?.show?.contentType === CONTENT_TYPE.MUSIC;

  return (
    <PodcastPlayerUI
      analyticsData={analyticsData}
      backgroundUrl={backgroundUrl}
      displayDownloadBanner={displayDownloadBanner}
      music={music}
    />
  );
}

export default PodcastPlayer;

