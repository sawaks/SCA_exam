import routes from 'common/named-routes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { playerOverlayUpdateVisible } from 'store/actions/player-overlay';
import usePrevious from 'utilities/helpers/usePrevious';
import LiveShowOverlayUI from './LiveShowOverlayUI';
import { endLiveShow, updateLiveShowData } from '../../../../../store/actions/live-show';

const showHasEnded = 'Show has ended';

function LiveShowOverlay() {
  const [origin, setOrigin] = useState({});
  const [isLive, setIsLive] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const name = useSelector(state => state.liveShow?.liveShowName, shallowEqual);
  const playerBackgroundImageUrl = useSelector(state => state.liveShow?.liveShowBgImage, shallowEqual);
  const studioPhone = useSelector(state => state.liveShow?.studioPhone, shallowEqual);
  const liveShowImage = useSelector(state => state.liveShow?.liveShowImage, shallowEqual);
  const slug = useSelector(state => state.liveShow?.liveShowSlug, shallowEqual);
  const visible = useSelector(state => state.playerOverlay.visible, shallowEqual);
  const liveShowEndUTC = useSelector(state => state?.liveShow?.liveShowEndUTC, shallowEqual);

  const prevVisible = usePrevious(visible);

  function isMaximizingOverlay() {
    return (!prevVisible && visible) || (slug && visible);
  }

  function isMinimizingOverlay() {
    return prevVisible && !visible;
  }

  function createShowRoute() {
    return `${routes.external.podcasts}/${slug}`;
  }

  function updateBrowserUrl() {
    const { history } = window;

    if (isMaximizingOverlay() && slug) {
      history.pushState(history.state, '', window.location.href);
      const showUrl = createShowRoute();
      // replaceState only rewrites the browser's url. It doesn't do anything to the. There is no way of accomplishing the same using next router
      history.replaceState(
        {
          url: showUrl,
          as: showUrl,
          options: { shallow: undefined },
        },
        '',
        `${showUrl}`,
      );
      setOrigin({ url: showUrl, as: showUrl });
      return;
    }

    if (isMinimizingOverlay()) {
      router.replace(origin.url, origin.as);
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
          { src: liveShowImage, sizes: '512x512', type: 'image/png' },
        ],
      });
    }
    // By updating the browser's URL we can make the overlay "look like a page". It makes it easier for sharing
    updateBrowserUrl();
  }, [slug, visible]);

  useEffect(() => {
    const currentUtcDateTime = Date.now();
    const liveShowEndUTCTime = new Date(liveShowEndUTC).getTime();
    const timeToLive = liveShowEndUTCTime - currentUtcDateTime;
    const timerToLive = setTimeout(() => {
      setIsLive(false);
      dispatch(endLiveShow());
      dispatch(updateLiveShowData({ liveShowName: showHasEnded }));
    }, timeToLive);
    return () => {
      if (timerToLive) {
        clearTimeout(timerToLive);
      }
    };
  }, []);

  return (
    <LiveShowOverlayUI
      visible={visible}
      playerBackgroundImageUrl={playerBackgroundImageUrl}
      studioPhone={studioPhone}
      isLive={isLive}
    />
  );
}

export default LiveShowOverlay;
