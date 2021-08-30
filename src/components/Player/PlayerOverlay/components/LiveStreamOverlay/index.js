import routes from 'common/named-routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { playerOverlayUpdateVisible } from 'store/actions/player-overlay';
import usePrevious from 'utilities/helpers/usePrevious';
import LiveStreamOverlayUI from './LiveStreamOverlayUI';

function LiveStreamOverlay() {
  const [origin, setOrigin] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  const name = useSelector(state => state.station?.name, shallowEqual);
  const backgroundColour = useSelector(state => state.station?.backgroundColour, shallowEqual);
  const stationLogoImageUrl = useSelector(state => state.station?.images?.logoLarge, shallowEqual);
  const playerBackgroundImageUrl = useSelector(state => state.station?.images?.playerBackground, shallowEqual);
  const relatedStations = useSelector(state => state.moreStations, shallowEqual);
  const shareImageUrl = useSelector(state => state.station?.images?.share, shallowEqual);
  const slug = useSelector(state => state.station?.slug, shallowEqual);
  const visible = useSelector(state => state.playerOverlay.visible, shallowEqual);

  const prevVisible = usePrevious(visible);
  const prevSlug = usePrevious(slug);

  function isMaximizingOverlay() {
    return (!prevVisible && visible) || (slug && visible);
  }

  function isMinimizingOverlay() {
    return prevVisible && !visible;
  }

  function isChangingEpisode() {
    return (prevVisible && visible && ((!isEmpty(slug) && !isEmpty(prevSlug)) && (prevSlug !== slug)));
  }

  function createEpisodeRoute() {
    return `${routes.internal.stations}/${slug}`;
  }

  function updateBrowserUrl() {
    const { history } = window;

    if (isChangingEpisode()) {
      const stationUrl = createEpisodeRoute();
      // replaceState only rewrites the browser's url. It doesn't do anything to the app. There is no way of accomplishing the same using next router
      history.replaceState(
        {
          url: stationUrl,
          as: stationUrl,
          options: { shallow: undefined },
        },
        '',
        `${stationUrl}`,
      );

      return;
    }

    if (isMaximizingOverlay()) {
      if (history?.state?.as !== origin?.as) {
        setOrigin(history.state);
      }

      if (slug) {
        history.pushState(history.state, '', window.location.href);
        const stationUrl = createEpisodeRoute();
        // replaceState only rewrites the browser's url. It doesn't do anything to the. There is no way of accomplishing the same using next router
        history.replaceState(
          {
            url: stationUrl,
            as: stationUrl,
            options: { shallow: undefined },
          },
          '',
          `${stationUrl}`,
        );
      }
      return;
    }

    if (isMinimizingOverlay()) {
      if (!isEmpty(origin)) {
        router.replace(origin.url, origin.as);
      } else {
        router.back();
      }
    }
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      dispatch(playerOverlayUpdateVisible(false));
    });
  }, []);

  useEffect(() => {
    if ('mediaSession' in navigator && slug) {
      // eslint-disable-next-line no-undef
      navigator.mediaSession.metadata = new MediaMetadata({
        title: name,
        artwork: [
          { src: shareImageUrl, sizes: '512x512', type: 'image/png' },
        ],
      });
    }
    // By updating the browser's URL we can make the overlay "look like a page". It makes it easier for sharing
    updateBrowserUrl();
  }, [slug, visible]);
  return (
    <LiveStreamOverlayUI
      visible={visible}
      relatedStations={relatedStations}
      backgroundColour={backgroundColour}
      stationLogoImageUrl={stationLogoImageUrl}
      playerBackgroundImageUrl={playerBackgroundImageUrl}
    />
  );
}

export default LiveStreamOverlay;
