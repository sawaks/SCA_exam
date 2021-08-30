import NoSSR from 'components/NoSSR';
import AudioPlayerEventsHandler from 'components/Player/AudioPlayer/AudioPlayerEventsHandler';
import LiveStreamEventsHandler from 'components/Player/LiveStreamPlayer/LiveStreamEventsHandler';
import PlayerOverlay from 'components/Player/PlayerOverlay';
import TrailerPlayerEvents from 'components/Trailer/player/trailerEvents';
import React from 'react';
import GlobalStyles from 'styles/global';
import AnalyticsEventsHandler from './AnalyticsEventsHandler';
import EasterEgg from './EasterEgg';
import NowPlaying from './NowPlaying';
import Firebase from './Firebase';
import Modals from './Modals';
import Toast from './Toast';

/**
 * @method Global
 * @description All of these components need to survive across
 * page navigation. The next _app.js component renders them for us.
 * NOTE: Please do not turn this into a PureComponent as it will prevent updates
 * for the withRouter HOC to underlying components. I repeat, DO NOT USE PURECOMPONENT.
 * Thank you 🙂.
 * @returns Component
 */
export default function Global() {
  return (
    <>
      <GlobalStyles />
      <Toast />
      <PlayerOverlay />
      <NowPlaying />
      <AudioPlayerEventsHandler />
      <LiveStreamEventsHandler />
      <TrailerPlayerEvents />
      <NoSSR>
        <EasterEgg />
        <Firebase />
        <Modals />
        <AnalyticsEventsHandler />
      </NoSSR>
    </>
  );
}

