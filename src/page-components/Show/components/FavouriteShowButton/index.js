import FavouriteButton from 'components/FavouriteButton';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { addFavouriteShow, deleteFavouriteShow } from 'store/actions/favourite';
import { displaySignupModal } from 'store/actions/userInteractions';
import addToDataLayer from 'utilities/helpers/dataLayer';
import page from 'utilities/GTM/pageTags';
import gtm from 'utilities/GTM/gtmTags';

const makeIsFavSelector = () => createSelector(
  state => state.userSessionInfo.favouriteShows,
  state => state.profile.userId,
  (_, showId) => showId,
  (favouriteShows, userId, showId) => Boolean(userId && favouriteShows?.[showId] && favouriteShows?.[showId]?.inFirebase)
);
function FavouriteShowButton({ id, name, slug, type }) {
  const dispatch = useDispatch();
  const isFavSelector = useMemo(makeIsFavSelector, []);
  const isFav = useSelector(state => isFavSelector(state, id));
  const { userId } = useSelector(({ profile }) => ({ userId: profile.userId }), shallowEqual);
  const { episodeSortOrder } = useSelector(({ userSessionInfo }) => ({
    episodeSortOrder: get(userSessionInfo, ['podcasts', id, 'episodesSortOrder'], 'unplayed'),
  }), shallowEqual);
  const isLoggedIn = userId !== null;

  const handleFavouriteClick = () => {
    if (!userId) {
      dispatch(displaySignupModal());
      return;
    }
    if (!isFav) {
      dispatch(addFavouriteShow(userId, id, name, slug, type, episodeSortOrder));
      addToDataLayer({
        event: gtm.podcastAddToFavourites,
        pageType: page.showPage,
      });

      if (name) {
        window.scaGtmDataLayer.push({
          event: 'onKruxChanged',
          favourited_show: name,
          kxsegment: window.Krux ? window.Krux.segments : null,
        });
        window.Krux('ns:sca', 'page:load', null, { pageView: false });
      }
    }
  };

  const handleUnFavouriteClick = () => {
    if (isFav) {
      dispatch(deleteFavouriteShow(userId, id));
    }
  };

  return (
    <FavouriteButton
      disabled={!isLoggedIn}
      onFavouriteClick={handleFavouriteClick}
      onUnfavouriteClick={handleUnFavouriteClick}
      isFav={isFav}
    />
  );
}

FavouriteShowButton.propTypes = {
  id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default FavouriteShowButton;
