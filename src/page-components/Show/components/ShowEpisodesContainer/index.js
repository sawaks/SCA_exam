import { Flex } from 'components/Grid';
import TopicFilter from 'components/TopicFilter';
import { useRouter } from 'next/router';
import PropTypes, { arrayOf, shape, string } from 'prop-types';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { updateFavouriteShow } from 'store/actions/favourite';
import { addNewShowSessionInfo, editShowSortOrder } from 'store/actions/userSessionInfo';
import { EPISODE_ORIGIN, EPISODES_SORT_OPTIONS, EPISODES_TYPE_ORDER_PAIRING } from 'utilities/constants';
import EpisodesAccordion from './components/EpisodesAccordion';

const ShowEpisodesContainer = ({ dropdownButtonId, origin, showContents, isShowPage, isPlaylistPage, isEpisodePage, playerBgImage }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const seasons = showContents?.seasons;
  const showId = showContents?.id;
  const showSlug = showContents?.slug;
  const showType = showContents?.showType;

  const userId = useSelector(state => state.profile.userId, shallowEqual);
  const isFavourite = useSelector(({ userSessionInfo }) => {
    const favouriteShow = userSessionInfo.favouriteShows?.[showId];
    return Boolean(favouriteShow && favouriteShow.inFirebase);
  }, shallowEqual);

  const sortOrder = useSelector(({ userSessionInfo }) => userSessionInfo.shows?.[showId]?.sortOrder, shallowEqual);

  useEffect(() => {
    const payload = { showId, showSlug, seasons, showType, playerBgImage };
    dispatch(addNewShowSessionInfo(payload));
  }, [showSlug]);

  useEffect(() => {
    if (isFavourite && userId) {
      // Only update the show's lastSeen field when the user leaves the page. Otherwise the "new" tag will never appear
      router.events.on('routeChangeComplete', () => {
        dispatch(updateFavouriteShow(userId, showId));
      });
    }
  }, [userId]);

  const onSelectionChange = (item) => {
    const sortOrderValue = item.value;
    const sortOrderKey = item.key;
    if (isFavourite && userId) {
      dispatch(updateFavouriteShow(userId, showId, sortOrderKey));
    }
    // Dont change sort order, if the current order is already the chosen order.
    if (sortOrder && sortOrder !== sortOrderValue) {
      dispatch(editShowSortOrder(sortOrderValue, showSlug, showId));
    }
    // If previous sort order does not exists, dont change the sort order if the default sort order is already the chosen order.
    if (!sortOrder && EPISODES_TYPE_ORDER_PAIRING[showType] !== sortOrderValue) {
      dispatch(editShowSortOrder(sortOrderValue, showSlug, showId));
    }
  };

  if (seasons) {
    return (
      <Flex smallBottomPadding justifyContent="flex-end">
        <TopicFilter
          options={EPISODES_SORT_OPTIONS}
          dropdownButtonId={dropdownButtonId}
          onSelectionChange={index => onSelectionChange(index)}
        >
          <EpisodesAccordion
            origin={origin}
            showContents={showContents}
            isShowPage={isShowPage}
            isPlaylistPage={isPlaylistPage}
            isEpisodePage={isEpisodePage}
          />
        </TopicFilter>
      </Flex>
    );
  }
  return null;
};

ShowEpisodesContainer.propTypes = {
  showContents: shape({
    id: string,
    showId: string,
    slug: string,
    categories: arrayOf(PropTypes.object),
    seasons: arrayOf(PropTypes.object),
  }).isRequired,
  dropdownButtonId: PropTypes.string,
  isPlaylistPage: PropTypes.bool,
  isShowPage: PropTypes.bool,
  origin: PropTypes.string,
  isEpisodePage: PropTypes.bool,
  playerBgImage: PropTypes.string,
};

ShowEpisodesContainer.defaultProps = {
  dropdownButtonId: `filter-${Math.random()
    .toString(36)
    .substr(2, 9)}`,
  isPlaylistPage: false,
  isShowPage: false,
  origin: EPISODE_ORIGIN.default,
  isEpisodePage: false,
  playerBgImage: '',
};

export default ShowEpisodesContainer;
