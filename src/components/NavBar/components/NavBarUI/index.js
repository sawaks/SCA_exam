import { bool, string } from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import NavLink from 'components/NavLink';
import { Container, Flex } from 'components/Grid';
import styled, { css } from 'styled-components';
import screen from 'styles/helpers/media';
import nameRoutes from 'common/named-routes';
import spacing from 'styles/helpers/spacing';
import SearchBar from 'components/SearchBar';
import { displaySignupModal } from 'store/actions/userInteractions';
import Headroom from 'react-headroom';
import BarLogo from '../BarLogo';
import ProfileMenu from '../ProfileMenu';

const StyledBarUI = styled(Flex)`
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: top 0.3s;

  ${screen.md} {
    font-size: 14px;
    letter-spacing: 1.2px;
  }
`;

const BarTabs = styled(Flex)`
  display: none;
  flex-shrink: 0;

  ${screen.md} {
    display: inherit;
  }
`;

const StyledLink = styled.a`
  cursor: pointer;
  font-family: dunbar-tall, sans-serif;
  font-size: 14px;
  font-weight: bold;
  line-height: 0.86;
  letter-spacing: normal;
  height: 28px;
  text-decoration: none;
  padding: 0 0;
  margin: 0 ${spacing.s};
  color: white;
  display: flex;
  align-items: center;

  ${screen.md} {
    margin: 0 ${spacing.m};
  }

  ${screen.xl} {
    margin: 0 ${spacing.l};
  }

  ${props => props.isActive
    && css`
      padding: 0 ${spacing.m};
      border-radius: 20px;
      border: 2px solid ${props.theme.milkPunch};
      color: ${props.theme.milkPunch};
    `}

  &:hover {
    color: ${props => props.theme.milkPunch};
    text-decoration: none;
  }
`;

function NavBarUI({ isPWA, isLoggedIn, assumeLoggedIn, firstName, lastName }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!isLoggedIn && !assumeLoggedIn) {
      dispatch(displaySignupModal());
    }
  };

  return (
    <Headroom>
      <Container>
        <nav>
          <StyledBarUI
            justifyContent="space-between"
            alignItems="center"
            isPWA={isPWA}
            pt={[spacing.s, spacing.l, spacing.l]}
            pb={[spacing.s, spacing.l, spacing.l]}
          >
            <Flex width={1}>
              <BarLogo isPWA={isPWA} />
              <BarTabs alignItems="center">
                <NavLink href={`${nameRoutes.internal.root}`}>
                  <StyledLink>Home</StyledLink>
                </NavLink>
                <NavLink href={`${nameRoutes.internal.browse}`}>
                  <StyledLink>Browse</StyledLink>
                </NavLink>
                <NavLink
                  href={`${nameRoutes.internal.myFeed}`}
                  disabled={!isLoggedIn && !assumeLoggedIn}
                >
                  <StyledLink onClick={handleClick}>My Feed</StyledLink>
                </NavLink>
                <NavLink
                  href={`${nameRoutes.internal.library}`}
                  disabled={!isLoggedIn && !assumeLoggedIn}
                >
                  <StyledLink onClick={handleClick}>Library</StyledLink>
                </NavLink>
              </BarTabs>
              <SearchBar />
            </Flex>
            <BarTabs alignItems="center">
              <ProfileMenu
                isLoggedIn={isLoggedIn}
                firstName={firstName}
                lastName={lastName}
              />
            </BarTabs>
          </StyledBarUI>
        </nav>
      </Container>
    </Headroom>
  );
}

NavBarUI.propTypes = {
  isPWA: bool.isRequired,
  assumeLoggedIn: bool.isRequired,
  isLoggedIn: bool,
  firstName: string,
  lastName: string,
};

NavBarUI.defaultProps = {
  isLoggedIn: '',
  firstName: '',
  lastName: '',
};

export default NavBarUI;
