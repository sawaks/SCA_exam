import FavouriteButton from 'components/FavouriteButton';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { displayNotificationsModal, displaySignupModal } from 'store/actions/userInteractions';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';

const SIGNUP_MODAL_TEXT = 'To Subscribe to your favourite shows, you have to create an account.';
const NOTIFICATIONS_MODAL_TEXT = 'Would you like to receive notifications about new episodes for your favourited shows?';

const ShowFavouriteButton = ({ podcastId, podcastName }) => {
  const dispatch = useDispatch();
  const {
    userId,
    isFav,
    // episodesSortOrder,
    notificationPermStatus,
    notificationPermissionRejected,
    isFCMRegistered,
    browserName,
    isMobile,
  } = useSelector(({ profile, userSessionInfo, userInteractions, device }) => ({
    userId: profile.userId,
    isFav: Boolean(profile.userId && profile.favouritePodcasts && profile.favouritePodcasts[podcastId]),
    episodesSortOrder: podcastId && userSessionInfo.podcasts && userSessionInfo.podcasts[podcastId] && userSessionInfo.podcasts[podcastId].episodesSortOrder,
    notificationPermStatus: device.notificationPermStatus,
    notificationPermissionRejected: userInteractions.notificationPermissionRejected,
    isFCMRegistered: profile.fcm.isFCMRegistered,
    browserName: get(device, 'browser.name', ''),
    isMobile: get(device, 'browser.mobile', false),
  }
  ), shallowEqual);

  const sendToGtm = (eventType) => {
    addToDataLayer({
      event: gtm.onPodcastFavouriteClick,
      eventType,
      podcastName,
    });
  };
  return (
    <FavouriteButton
      isFav={isFav}
      isMobile={isMobile}
      onFavouriteClick={() => {
        if (userId && (notificationPermissionRejected || notificationPermStatus === 'denied')) {
          sendToGtm('Favourite');
        } else if (userId && isFCMRegistered) {
          sendToGtm('Favourite');
        } else if (userId && !notificationPermissionRejected && notificationPermStatus !== 'denied' && !isFCMRegistered && browserName !== 'safari') {
          dispatch(displayNotificationsModal(NOTIFICATIONS_MODAL_TEXT));
          sendToGtm('Favourite');
        } else {
          dispatch(displaySignupModal(SIGNUP_MODAL_TEXT));
        }
      }}
      onUnfavouriteClick={() => {
        if (userId) {
          sendToGtm('Favourite');
        } else {
          dispatch(displaySignupModal(SIGNUP_MODAL_TEXT));
        }
      }}
    />
  );
};

ShowFavouriteButton.propTypes = {
  podcastId: PropTypes.string,
  podcastName: PropTypes.string,
  browser: PropTypes.shape({
    name: PropTypes.string,
    mobile: PropTypes.bool,
    os: PropTypes.string,
  }),
};
ShowFavouriteButton.defaultProps = {
  podcastId: '',
  podcastName: '',
  browser: null,
};

export default ShowFavouriteButton;
