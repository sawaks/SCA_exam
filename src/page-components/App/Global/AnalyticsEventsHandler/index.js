import { useState, useEffect } from 'react';
import 'firebase/messaging';
import sha256 from 'js-sha256';
import get from 'lodash/get';
import moment from 'moment';
import { shallowEqual, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import usePrevious from 'utilities/helpers/usePrevious';
import useOmnyConsumptionAnalytics from './omny/useOmnyConsumptionAnalytics';

function AnalyticsEventsHandler() {
  /** ********************************************************************
   * GTM analytics.
   *
   *
   *
   * Dispatch to datalayer once a new stream has played for more than 1 second. Will only dispatch once for each new stream.
   * */
  const [audioChangeCount, setAudioChangeCount] = useState(0);

  const [prevRoute, setPrevRoute] = useState();
  const router = useRouter();

  const { gender, postcode, emailSha256, yearOfBirth } = useSelector(({ profile }) => ({
    gender: get(profile, 'gender', null),
    postcode: get(profile, 'postcode', null),
    emailSha256: get(profile, 'email', null) ? sha256(profile.email) : null,
    yearOfBirth: get(profile, 'dob', null) ? moment(profile.dob).year() : null,
  }),
  shallowEqual
  );

  const { currentTime, audioPlaying, audioChangeNumber } = useSelector(({ audioPlayer }) => ({
    currentTime: get(audioPlayer, 'currentTime', null),
    audioPlaying: get(audioPlayer, 'playing', null),
    audioChangeNumber: get(audioPlayer, 'audioChangeCount', null),
  }), shallowEqual);

  const { favouriteShows, favouriteCategories, favouriteStations, favouriteGenres } = useSelector(({ userSessionInfo }) => ({
    favouriteShows: get(userSessionInfo, 'favouriteShows', null),
    favouriteCategories: get(userSessionInfo, 'favouriteCategories', null),
    favouriteStations: get(userSessionInfo, 'favouriteStations', null),
    favouriteGenres: get(userSessionInfo, 'favouriteGenres', null),
  }), shallowEqual);

  const { showName, categoryName, episodeId, episodeName } = useSelector(({ episode }) => ({
    showName: get(episode, 'show.name', null),
    showCategory: get(episode, 'show.categories[0].name', null),
    season: get(episode, 'season', null),
    episodeId: get(episode, 'id', null),
    episodeNumber: get(episode, 'episode', null),
    streamingUrl: get(episode, 'audioUrl', null),
    categoryName: get(episode, 'show.categories[0].name', null),
    episodeName: get(episode, 'title', null),
  }),
  shallowEqual
  );

  const { stationName, streamingURLStation, genreStation } = useSelector(({ station }) => ({
    stationName: station?.name,
    streamingURLStation: station?.audioStreams?.[0]?.url,
    genreStation: station?.genres?.map(item => item.name)[0],
  }));

  const { stationStreamStarted } = useSelector(({ liveStreamPlayer }) => ({
    stationStreamStarted: get(liveStreamPlayer, 'playing', null),
  }));

  const prevCurrentTime = usePrevious(currentTime);
  const prevAudioPlaying = usePrevious(audioPlaying);
  const prevEpisodeId = usePrevious(episodeId);

  useOmnyConsumptionAnalytics({ prevCurrentTime, currentTime, prevEpisodeId, episodeId, prevAudioPlaying, audioPlaying });

  useEffect(() => {
    if (stationStreamStarted) {
      addToDataLayer({
        event: gtm.player1SecondStart,
        PageType: 'station',
        StreamingURL: streamingURLStation,
        Genres: genreStation,
        StationName: stationName,
        StreamingStatus: stationStreamStarted,
      });
    }
  }, [stationStreamStarted]);

  /** ******************************************************************** * */

  /** ********************************************************************
   * KRUX analytics.
   * */

  useEffect(() => {
    // krux ajax control tag triggers only when client side navigation takes place
    if (prevRoute !== undefined && prevRoute !== router.pathname) {
      const date = moment();
      window.scaGtmDataLayer.push({
        event: 'onKruxChanged',
        dow: date.format('dddd'),
        local_half_hour: `${date.hours()}${date.minutes() < 30 ? '00' : '30'}`,
        kxsegment: window.Krux ? window.Krux.segments : null,
      });
      window.Krux('ns:sca', 'page:load', null, { pageView: true });
    }
    setPrevRoute(router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    // If station stream audio has been playing for 1 minute
    if (audioChangeNumber && audioChangeNumber > audioChangeCount) {
      if (currentTime > 1) {
        addToDataLayer({
          event: 'onKruxChanged',
          PageType: 'station',
          StreamingURL: streamingURLStation,
          Genres: genreStation,
          '1min_stream': stationName,
        });
        setAudioChangeCount(audioChangeNumber);
        window.Krux('ns:sca', 'page:load', null, { pageView: false });
      }
    }
  }, [audioChangeNumber, currentTime]);

  /**
   * Let KRUX know when the any of the fields changes.
   */
  useEffect(() => {
    const date = moment();
    if (gender && postcode && yearOfBirth) {
      window.scaGtmDataLayer.push({
        event: 'onKruxChanged',
        gender,
        postcode,
        email_sha256: emailSha256,
        yob: yearOfBirth,
        dow: date.format('dddd'),
        local_half_hour: `${date.hours()}${date.minutes() < 30 ? '00' : '30'}`,
        kxsegment: window.Krux ? window.Krux.segments : null,
      });
      window.Krux('ns:sca', 'page:load', null, { pageView: false });
    }
  }, [gender, postcode, emailSha256, yearOfBirth]);

  useEffect(() => {
    const date = moment();
    if (categoryName && showName && episodeName) {
      window.scaGtmDataLayer.push({
        event: 'onKruxChanged',
        category_name: categoryName,
        show_name: showName,
        episode_name: episodeName,
        dow: date.format('dddd'),
        local_half_hour: `${date.hours()}${date.minutes() < 30 ? '00' : '30'}`,
        kxsegment: window.Krux ? window.Krux.segments : null,
      });
      window.Krux('ns:sca', 'page:load', null, { pageView: false });
    }
  }, [categoryName, showName, episodeName]);

  useEffect(() => {
    const KruxLoadAfterRegistration = () => {
      const favShowNames = Object.keys(favouriteShows).length > 0 && Object.values(favouriteShows).map(data => data.name);
      const favCatNames = favouriteCategories.length > 0 && favouriteCategories.map(data => data.name);
      const favStationNames = Object.keys(favouriteStations).length > 0 && Object.values(favouriteStations).map(data => data.name);
      const favGenres = favouriteGenres.length > 0 && favouriteGenres.map(data => data.name);

      if (favCatNames && favShowNames && favStationNames && favGenres) {
        window.scaGtmDataLayer.push({
          event: 'onKruxChanged',
          declared_categories: favCatNames,
          declared_shows: favShowNames,
          declared_stations: favStationNames,
          declared_genres: favGenres,
          kxsegment: window.Krux ? window.Krux.segments : null,
        });
        window.Krux('ns:sca', 'page:load', null, { pageView: false });
      }
    };

    KruxLoadAfterRegistration();
  }, [favouriteShows, favouriteCategories, favouriteStations, favouriteGenres]);

  /** ******************************************************************** * */

  return null;
}

export default AnalyticsEventsHandler;
