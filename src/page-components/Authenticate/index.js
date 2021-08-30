import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { setLoginDeviceType } from 'store/actions/userInteractions';
import RenderForm from './Forms';
import { ACTIVATE_DEVICE_ROUTE, ACTIVATE_DEVICE_TYPE, LISTNR_META } from '../../utilities/constants';

function Authenticate({ oAuthState, oAuthRedirectUri, deviceType, isSmartDevice }) {
  const dispatch = useDispatch();
  const [view, setView] = useState('login');
  const [newUser, setNewUser] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    postcode: '',
    categories: [],
    shows: [],
    genres: [],
    hasUserOnboardedMusic: false,
    stations: [],
  });

  useEffect(() => (
    dispatch(setLoginDeviceType(deviceType, { oAuthState, oAuthRedirectUri }))
  ), []);

  return (
    <main>
      <Head>
        <title>{LISTNR_META.pages.authenticate.title}</title>
        <meta name="title" content={LISTNR_META.pages.authenticate.title} />
        <meta name="description" content={LISTNR_META.pages.authenticate.description} />
        <meta property="og:title" content={LISTNR_META.pages.authenticate.title} />
        <meta property="og:description" content={LISTNR_META.pages.authenticate.description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={process.env.NEXT_PUBLIC_SITE_NAME} />
      </Head>
      <RenderForm view={view} changeView={setView} userState={newUser} updateUserState={setNewUser} isSmartDevice={isSmartDevice} deviceType={deviceType} />
    </main>
  );
}

Authenticate.getInitialProps = ({ query, pathname }) => {
  const oAuthState = get(query, 'state', null);
  const oAuthRedirectUri = get(query, 'redirect_uri', null);
  let deviceType = ACTIVATE_DEVICE_TYPE.web;

  if (pathname === ACTIVATE_DEVICE_ROUTE.deviceCode) {
    deviceType = ACTIVATE_DEVICE_TYPE.tv;
  }

  if (pathname === ACTIVATE_DEVICE_ROUTE.oauth) {
    deviceType = ACTIVATE_DEVICE_TYPE.smartDevices;
  }

  const isSmartDevice = deviceType !== ACTIVATE_DEVICE_TYPE.web;

  return {
    oAuthState,
    oAuthRedirectUri,
    deviceType,
    isSmartDevice,
  };
};

Authenticate.propTypes = {
  oAuthState: PropTypes.string,
  oAuthRedirectUri: PropTypes.string,
  deviceType: PropTypes.string,
  isSmartDevice: PropTypes.bool,
};

Authenticate.defaultProps = {
  oAuthState: null,
  oAuthRedirectUri: null,
  deviceType: ACTIVATE_DEVICE_TYPE.web,
  isSmartDevice: false,
};

export default Authenticate;
