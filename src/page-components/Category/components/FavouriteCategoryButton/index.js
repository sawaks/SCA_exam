import FavouriteButton from 'components/FavouriteButton';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { addFavouriteCategory, deleteFavouriteCategory } from 'store/actions/favourite';
import { displaySignupModal } from 'store/actions/userInteractions';

const makeIsFavSelector = () => createSelector(
  state => state.userSessionInfo.favouriteCategories,
  state => state.profile.userId,
  (_, categoryId) => categoryId,
  (favouriteCategories, userId, categoryId) => userId && favouriteCategories.some(item => item.id === categoryId)
);

function FavouriteCategoryButton({ id, name, slug }) {
  const dispatch = useDispatch();

  const isFavSelector = useMemo(makeIsFavSelector, []);
  const isFav = useSelector(state => isFavSelector(state, id));
  const { userId } = useSelector(({ profile }) => ({ userId: profile.userId }), shallowEqual);

  const handleFavouriteClick = () => {
    if (!userId) {
      dispatch(displaySignupModal());
      return;
    }
    if (!isFav) {
      dispatch(addFavouriteCategory(userId, id, name, slug));
      if (name) {
        window.scaGtmDataLayer.push({
          event: 'onKruxChanged',
          favourited_category: name,
          kxsegment: window.Krux ? window.Krux.segments : null,
        });
        window.Krux('ns:sca', 'page:load', null, { pageView: false });
      }
    }
  };

  const handleUnFavouriteClick = () => {
    if (isFav) {
      dispatch(deleteFavouriteCategory(userId, id));
    }
  };

  return <FavouriteButton onFavouriteClick={handleFavouriteClick} onUnfavouriteClick={handleUnFavouriteClick} isFav={isFav} />;
}

FavouriteCategoryButton.propTypes = {
  id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FavouriteCategoryButton;
