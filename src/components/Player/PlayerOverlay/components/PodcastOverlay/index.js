import routes from 'common/named-routes';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { playerOverlayUpdateVisible } from 'store/actions/player-overlay';
import usePrevious from 'utilities/helpers/usePrevious';
import PlayerOverlayUI from './PlayerOverlayUI';

function PodcastOverlay() {
  const [origin, setOrigin] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();

  const visible = useSelector(state => state.playerOverlay.visible, shallowEqual);
  const imageUrl = useSelector(state => state.episode.imageUrl, shallowEqual);

  const episodeOrigin = useSelector(state => state.episode.origin, shallowEqual);
  const episodeSlug = useSelector(state => state.episode.slug, shallowEqual);
  const episodeTitle = useSelector(state => state.episode.title, shallowEqual);
  const playlistSlug = useSelector(state => state.episode.playlistSlug, shallowEqual);
  const podcastId = useSelector(state => state.episode?.show?.id, shallowEqual);
  const podcastSlug = useSelector(state => state.episode?.show?.slug, shallowEqual);
  const podcastTitle = useSelector(state => state.episode?.show?.name, shallowEqual);

  const prevVisible = usePrevious(visible);
  const prevEpisodeSlug = usePrevious(episodeSlug);

  function isMaximizingOverlay() {
    return (!prevVisible && visible) || (episodeSlug && visible);
  }

  function isMinimizingOverlay() {
    return prevVisible && !visible;
  }

  function isChangingEpisode() {
    return (prevVisible && visible && ((!isEmpty(episodeSlug) && !isEmpty(prevEpisodeSlug)) && (prevEpisodeSlug !== episodeSlug)));
  }

  function createEpisodeRoute() {
    return playlistSlug ? `${routes.external.playlists}/${playlistSlug}/${episodeSlug}` : `${routes.internal.podcasts}/${podcastSlug}/${episodeSlug}`;
  }

  function updateBrowserUrl() {
    const { history } = window;

    if (isChangingEpisode()) {
      const episodeUrl = createEpisodeRoute();
      // replaceState only rewrites the browser's url. It doesn't do anything to the app. There is no way of accomplishing the same using next router
      history.replaceState(
        {
          url: episodeUrl,
          as: episodeUrl,
          options: { shallow: undefined },
        },
        '',
        `${episodeUrl}`,
      );

      return;
    }

    if (isMaximizingOverlay()) {
      if (history?.state?.as !== origin?.as) {
        setOrigin(history.state);
      }

      if (episodeSlug) {
        history.pushState(history.state, '', window.location.href);
        const episodeUrl = createEpisodeRoute();
        // replaceState only rewrites the browser's url. It doesn't do anything to the. There is no way of accomplishing the same using next router
        history.replaceState(
          {
            url: episodeUrl,
            as: episodeUrl,
            options: { shallow: undefined },
          },
          '',
          `${episodeUrl}`,
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
    if ('mediaSession' in navigator) {
      // eslint-disable-next-line no-undef
      navigator.mediaSession.metadata = new MediaMetadata({
        title: episodeTitle,
        artist: podcastTitle,
        artwork: [
          { src: imageUrl, sizes: '512x512', type: 'image/png' },
        ],
      });
    }

    // By updating the browser's URL we can make the overlay "look like a page". It makes it easier for sharing
    updateBrowserUrl();
  }, [episodeSlug, visible]);

  return (
    <PlayerOverlayUI
      visible={visible}
      podcastSlug={podcastSlug}
      podcastId={podcastId}
      podcastTitle={podcastTitle}
      episodeOrigin={episodeOrigin}
      playlistSlug={playlistSlug}
      episodeSlug={episodeSlug}
    />
  );
}

export default PodcastOverlay;
