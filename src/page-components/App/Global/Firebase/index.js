import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import { fetchUserProfile, assumeLoggedIn } from 'store/actions/profile';
import { firebaseReady } from 'store/actions/firebase';

class Firebase extends React.Component {
  static propTypes = {
    fetchUserProfile: PropTypes.func.isRequired,
    firebaseReady: PropTypes.func.isRequired,
    assumeLoggedIn: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.assumeLoggedIn();

    if (!firebase.apps.length) {
      const config = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      };

      firebase.initializeApp(config);

      this.props.fetchUserProfile();
      // tell app that firebase has been initialised.
      this.props.firebaseReady();
    }
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  assumeLoggedIn,
  fetchUserProfile,
  firebaseReady,
};

export default connect(null, mapDispatchToProps)(Firebase);
