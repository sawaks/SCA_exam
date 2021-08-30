import React, { useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';
import { shallowEqual, useSelector } from 'react-redux';
import usePrevious from 'utilities/helpers/usePrevious';
import recentPlayedSelector from 'store/selectors/episode';
import ContinueListeningUI from './ContinueListeningUI';

function ContinueListening() {
  const allEpisodes = useSelector(({ userSessionInfo }) => userSessionInfo.listenedEpisodes, shallowEqual);
  const [finalEpisodeList, setFinalEpisodeList] = useState([]);
  const previousEpisodes = usePrevious(allEpisodes);

  async function loadEpisodeData() {
    const Last6Episodes = await recentPlayedSelector(allEpisodes);
    setFinalEpisodeList(Last6Episodes);
  }

  useEffect(() => {
    if (!isEqual(previousEpisodes, allEpisodes)) {
      loadEpisodeData();
    }
  }, [allEpisodes]);

  return (
    <>
      {finalEpisodeList.length > 0 && <ContinueListeningUI episodes={finalEpisodeList} />}
    </>
  );
}

export default ContinueListening;
