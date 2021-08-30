import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import MobileNavUI from './MobileNavUI';

function MobileNav() {
  const { userId: isLoggedIn, assumeLoggedIn } = useSelector(({ profile }) => profile, shallowEqual);

  return <MobileNavUI isLoggedIn={Boolean(isLoggedIn)} assumeLoggedIn={assumeLoggedIn} />;
}

export default MobileNav;

