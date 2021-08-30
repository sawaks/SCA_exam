import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import NavBarUI from 'components/NavBar/components/NavBarUI';

const NavBar = React.memo(() => {
  const isPWA = useSelector(({ device: { pwa } }) => pwa, shallowEqual);
  const { userId: isLoggedIn, firstName, lastName, assumeLoggedIn } = useSelector(({ profile }) => profile, shallowEqual);

  return <NavBarUI isPWA={isPWA} isLoggedIn={Boolean(isLoggedIn)} assumeLoggedIn={assumeLoggedIn} firstName={firstName} lastName={lastName} />;
});

NavBar.displayName = 'NavBar';

export default NavBar;
