import isEmpty from 'lodash/isEmpty';
import PropTypes, { arrayOf, bool, shape, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { addSeasonToShowSessionInfo } from 'store/actions/userSessionInfo';
import { EPISODE_ORIGIN } from 'utilities/constants';
import EpisodesAccordionList from '../EpisodesAccordionList';

const EpisodesAccordion = ({ showContents, origin, isShowPage, isPlaylistPage, isEpisodePage }) => {
  const { seasons, id: showId, slug, categories, contentType, images, showType } = showContents;
  const dispatch = useDispatch();
  const [listedSeason, setListedSeason] = useState(seasons);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(0);

  const seasonsLocal = useSelector(({ userSessionInfo }) => (userSessionInfo?.shows?.[showId]?.seasons), shallowEqual);
  const sortOrder = useSelector(({ userSessionInfo }) => (userSessionInfo?.shows?.[showId]?.sortOrder), shallowEqual);

  useEffect(() => {
    setListedSeason(seasons);
  }, [seasons]);

  useEffect(() => {
    if (seasonsLocal) {
      setListedSeason(seasonsLocal);
      const openIndex = isShowPage ? 0 : listedSeason.findIndex((item => item.episodes));
      setOpenAccordionIndex(openIndex);
    }
  }, [seasonsLocal]);

  const handleOnClick = (episodes, season) => {
    if (isEmpty(episodes)) {
      dispatch(addSeasonToShowSessionInfo(showId, slug, season));
    }
  };

  return (
    <EpisodesAccordionList
      categories={categories}
      contentType={contentType}
      isEpisodePage={isEpisodePage}
      isPlaylistPage={isPlaylistPage}
      isShowPage={isShowPage}
      listedSeason={listedSeason}
      openAccordionIndex={openAccordionIndex}
      openCallback={handleOnClick}
      origin={origin}
      showId={showId}
      slug={slug}
      sortOrder={sortOrder}
      showImages={images}
      isLocal={showType === 'timely' || false}
    />
  );
};

EpisodesAccordion.propTypes = {
  showContents: shape({
    id: string,
    showId: string,
    slug: string,
    categories: arrayOf(PropTypes.object),
    seasons: arrayOf(PropTypes.object),
  }).isRequired,
  origin: string,
  isShowPage: bool,
  isPlaylistPage: bool,
  isEpisodePage: bool,
};

EpisodesAccordion.defaultProps = {
  origin: EPISODE_ORIGIN.default,
  isShowPage: false,
  isPlaylistPage: false,
  isEpisodePage: false,
};

export default EpisodesAccordion;
