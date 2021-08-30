import { useEffect, useRef, useState } from 'react';
import * as omnyApi from 'utilities/api/omny';
import { v1 as uuidv1 } from 'uuid';

export default function useOmnyConsumptionAnalytics({ prevCurrentTime, currentTime, prevEpisodeId, episodeId, prevAudioPlaying, audioPlaying }) {
  const omnyEvents = useRef([]);

  const [clipSessionId, setClipSessionId] = useState(uuidv1());
  const [seqNumber, setSeqNumber] = useState(1);

  const getUnixTimestamp = () => Math.round((new Date()).getTime() / 1000);

  const addOmnyEvents = (events) => {
    omnyEvents.current = [...omnyEvents.current, ...events];
    setSeqNumber(seqNumber + events.length);
  };

  const flushOmnyEvents = async () => {
    if (!omnyEvents.current.length) {
      return;
    }

    if (audioPlaying) {
      // create an extra end event if the clip is still playing
      omnyEvents.current.push(
        {
          OrganizationId: process.env.NEXT_PUBLIC_OMNY_ORGANISATION_ID,
          ClipId: prevEpisodeId,
          SessionId: clipSessionId,
          Type: 'Stop',
          Position: currentTime,
          SeqNumber: seqNumber,
          Timestamp: getUnixTimestamp(),
        }
      );
    }

    await omnyApi.sendConsumptionData(omnyEvents.current);
    setClipSessionId(uuidv1());
    setSeqNumber(1);
    omnyEvents.current = [];
  };

  const trackingCleanup = (e) => {
    flushOmnyEvents();
    // the absence of a returnValue property on the event will guarantee the browser unload happens
    delete e.returnValue;
  };

  useEffect(() => {
    window.addEventListener('beforeunload', trackingCleanup);
    return () => {
      window.removeEventListener('beforeunload', trackingCleanup);
    };
  }, []);

  useEffect(() => {
    if (prevAudioPlaying !== undefined) {
      // only record the start event as the first event
      if ((omnyEvents.current.length === 0 && audioPlaying) || omnyEvents.current.length > 0) {
        addOmnyEvents([
          {
            OrganizationId: process.env.NEXT_PUBLIC_OMNY_ORGANISATION_ID,
            ClipId: episodeId,
            SessionId: clipSessionId,
            Type: audioPlaying ? 'Start' : 'Stop',
            Position: currentTime,
            SeqNumber: seqNumber,
            Timestamp: getUnixTimestamp(),
          }]);
      }
    }
  }, [audioPlaying]);

  useEffect(() => {
    if (Math.abs(currentTime - prevCurrentTime) >= 10 && audioPlaying) {
      addOmnyEvents(
        [
          {
            OrganizationId: process.env.NEXT_PUBLIC_OMNY_ORGANISATION_ID,
            ClipId: episodeId,
            SessionId: clipSessionId,
            Type: 'Stop',
            Position: prevCurrentTime,
            SeqNumber: seqNumber,
            Timestamp: getUnixTimestamp(),
          },
          {
            OrganizationId: process.env.NEXT_PUBLIC_OMNY_ORGANISATION_ID,
            ClipId: episodeId,
            SessionId: clipSessionId,
            Type: 'Start',
            Position: currentTime,
            SeqNumber: seqNumber + 1,
            Timestamp: getUnixTimestamp(),
          },
        ]
      );
    }
  }, [currentTime]);

  useEffect(() => {
    flushOmnyEvents();
  }, [episodeId]);
}

