/* eslint-disable no-use-before-define */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { onMessage } from 'store/actions/now-playing';
// import useStateCallback from 'utilities/helpers/useStateCallback';
import usePrevious from 'utilities/helpers/usePrevious';
import without from 'lodash/without';

const WEBSOCKET_NOW_PLAYING = process.env.NEXT_PUBLIC_WEBSOCKET_NOWPLAYING;
// const MAX_CONNECTION_ATTEMPTS = 10;
let socket;

export default function NowPlaying() {
  const dispatch = useDispatch();
  const [socketReady, setSocketReady] = useState(false);
  const reduxSubs = useSelector(state => state.nowPlaying.pageSubscriptions, shallowEqual);
  const previousSubs = usePrevious(reduxSubs);
  const playerSub = useSelector(state => state.nowPlaying.playerSubscription, shallowEqual);
  const previousPlayerSub = usePrevious(playerSub);

  // const reduxSubs = useSelector(({ nowPlaying }) => {
  //   const { pageSubscriptions, playerSubscription } = nowPlaying;
  //   if (!playerSubscription) {
  //     return pageSubscriptions;
  //   }
  //   const subs = [...pageSubscriptions, playerSubscription];
  //   // Use Set to avoid duplicates
  //   return [...new Set(subs)];
  // }, shallowEqual);

  // const [connectionAttempts, setConnectionAttempts] = useStateCallback(0);

  const updateSubscription = () => {
    if (playerSub && playerSub !== previousPlayerSub && !reduxSubs.includes(playerSub)) {
      if (socket.readyState === WebSocket.OPEN) {
        subscribe(playerSub);
      } else {
        createConnection();
      }
    }
    if (socket.readyState === WebSocket.OPEN) {
      if (previousPlayerSub && previousPlayerSub !== playerSub) {
        unsubscribe(previousPlayerSub);
      }
    }
  };

  const updateSubscriptions = () => {
    let newSubs = without(reduxSubs, ...previousSubs);
    if (newSubs.length === 0) {
      newSubs = reduxSubs;
    }

    if (newSubs) {
      if (socket.readyState === WebSocket.OPEN) {
        newSubs.forEach((sub) => {
          subscribe(sub);
        });
      } else {
        createConnection();
      }
    }
    if (socket.readyState === WebSocket.OPEN) {
      previousSubs.forEach((sub) => {
        if (!reduxSubs.includes(sub) && sub !== playerSub) {
          unsubscribe(sub);
        }
      });
    }
  };

  // const retryWebsocket = (err) => {
  //   console.error('SocketConnection error', err);
  //   setConnectionAttempts(prev => prev + 1, (attempts) => {
  //     if (attempts <= MAX_CONNECTION_ATTEMPTS) {
  //       setTimeout(createConnection, 10000);
  //     }
  //   });
  // };

  const createConnection = () => {
    setSocketReady(false);

    socket = new WebSocket(WEBSOCKET_NOW_PLAYING);
    socket.onopen = () => setSocketReady(true);
    socket.onmessage = msg => dispatch(onMessage(msg));
    // socket.onclose = retryWebsocket;
    // socket.onerror = retryWebsocket;
  };

  const subscribe = (callSign) => {
    socket.send(JSON.stringify({
      action: 'Subscribe',
      payload: {
        callSign,
        initialise: true,
      },
    }));
  };

  const unsubscribe = (callSign) => {
    socket.send(JSON.stringify({
      action: 'Unsubscribe',
      payload: {
        callSign,
      },
    }));
  };

  useEffect(() => {
    createConnection();
  }, []);

  useEffect(() => {
    if (socketReady) {
      updateSubscriptions();
    }
  }, [reduxSubs, socketReady]);

  useEffect(() => {
    if (socketReady) {
      updateSubscription();
    }
  }, [playerSub, socketReady]);

  return null;
}
