/* eslint-disable no-nested-ternary */
import React from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import nameRoutes from 'common/named-routes';
import Logo from 'components/Icons/listnr-logo.svg';
import BackToHomeIcon from 'components/Icons/arrow-back.svg';
import { Mobile, Desktop } from 'components/Screen';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';

const StyledLogo = styled(Logo)`
  cursor: pointer;
  height: 31px;
  width: 40px;
  margin-right: ${spacing.m};
  & .st0 {
    fill: #0095d7;
  }
  & .st1 {
    fill: #dcecf9;
  }

  ${screen.md} {
    margin: ${spacing.s} ${spacing.m} ${spacing.s} 0;
  }

  ${screen.xl} {
    height: 31px;
    width: 185px;
  }
`;

const LogoContainer = styled.a`
  display: flex;
  align-items: center;
`;

const StyledBackToHomeBtn = styled(BackToHomeIcon)`
  cursor: pointer;
  height: 16px;
  width: 16px;
`;

const BarLogo = ({ isPWA, router }) => {
  const { browse, contactUs, library, search, complaints, aboutUs, advertise, newsletter } = nameRoutes.internal;
  const { pathname } = router;

  return (
    <Link href={`${nameRoutes.external.root}`}>
      <LogoContainer title="Listnr logo">
        <Mobile>
          {
            (pathname === browse) || (pathname === search)
            || (pathname === library) || (pathname === contactUs) || (pathname === complaints)
            || (pathname === aboutUs) || (pathname === advertise) || (pathname === newsletter)
              ? (<StyledLogo />)
              : (isPWA ? <StyledBackToHomeBtn /> : <StyledLogo />)
          }
        </Mobile>
        <Desktop><StyledLogo /></Desktop>
      </LogoContainer>
    </Link>
  );
};
BarLogo.propTypes = {
  isPWA: PropTypes.bool,
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    asPath: PropTypes.string.isRequired,
  }).isRequired,
};

BarLogo.defaultProps = {
  isPWA: false,
};

export default withRouter(BarLogo);
