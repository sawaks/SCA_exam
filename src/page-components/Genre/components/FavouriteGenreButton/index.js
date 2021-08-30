import FavouriteButton from 'components/FavouriteButton';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { addFavouriteGenre, deleteFavouriteGenre } from 'store/actions/favourite';
import { displaySignupModal } from 'store/actions/userInteractions';

const makeIsFavSelector = () => createSelector(
  state => state.userSessionInfo.favouriteGenres,
  state => state.profile.userId,
  (_, slug) => slug,
  (favouriteGenres, userId, slug) => userId && favouriteGenres.some(item => item.slug === slug)
);

function FavouriteGenreButton({ name, slug, description }) {
  const dispatch = useDispatch();

  const isFavSelector = useMemo(makeIsFavSelector, []);
  const isFav = useSelector(state => isFavSelector(state, slug));
  const { userId } = useSelector(({ profile }) => ({ userId: profile.userId }), shallowEqual);

  const handleFavouriteClick = () => {
    if (!userId) {
      dispatch(displaySignupModal());
      return;
    }
    if (!isFav) {
      dispatch(addFavouriteGenre(userId, name, slug, description));
      if (name) {
        window.scaGtmDataLayer.push({
          event: 'onKruxChanged',
          favourited_genre: name,
          kxsegment: window.Krux ? window.Krux.segments : null,
        });
        window.Krux('ns:sca', 'page:load', null, { pageView: false });
      }
    }
  };

  const handleUnFavouriteClick = () => {
    if (isFav) {
      dispatch(deleteFavouriteGenre(userId, slug));
    }
  };

  return <FavouriteButton onFavouriteClick={handleFavouriteClick} onUnfavouriteClick={handleUnFavouriteClick} isFav={isFav} />;
}

FavouriteGenreButton.propTypes = {
  description: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FavouriteGenreButton;
