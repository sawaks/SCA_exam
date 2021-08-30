import React from 'react';
import { useDispatch } from 'react-redux';
import NavLink from 'components/NavLink';
import nameRoutes from 'common/named-routes';
import { Container, Flex } from 'components/Grid';
import { displaySignupModal } from 'store/actions/userInteractions';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import PropTypes from 'prop-types';
import HouseIcon from 'components/Icons/house.svg';
import BrowseIcon from 'components/Icons/browse.svg';
import MyFeedIcon from 'components/Icons/my-feed.svg';
import LibraryIcon from 'components/Icons/library.svg';
import AccountIcon from 'components/Icons/account.svg';

const StyledNav = styled.nav`
  background-color: ${props => props.theme.backgroundLight};
  display: flex;

  ${screen.md} {
    display: none;
  }
`;

const StyledBarUI = styled(Flex)`
  height: 60px;
  font-weight: 600;
  font-size: 10px;
`;

const StyledLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${props => (props.isActive ? props.theme.primary : props.theme.light)}!important;

  & path {
    fill: ${props => (props.isActive ? props.theme.primary : props.theme.light)};
  }

  &:hover {
    color: ${props => props.theme.primary};
    fill: ${props => props.theme.primary};
    & path {
      fill: ${props => props.theme.primary};
    }
  }
`;

const StyledText = styled.span`
  height: 12px;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.42px;
  margin-top: 6px;
  text-align: center;
  color: inherit;
`;

function MobileNav({ isLoggedIn, assumeLoggedIn }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!isLoggedIn && !assumeLoggedIn) {
      dispatch(displaySignupModal());
    }
  };
  return (
    <StyledNav>
      <Container>
        <StyledBarUI justifyContent="space-around" alignItems="center">
          <NavLink href={nameRoutes.external.root}>
            <StyledLink>
              <Flex flexDirection="column" alignItems="center">
                <HouseIcon />
                <StyledText>HOME</StyledText>
              </Flex>
            </StyledLink>
          </NavLink>
          <NavLink href={nameRoutes.external.myFeed} disabled={!isLoggedIn && !assumeLoggedIn}>
            <StyledLink onClick={handleClick}>
              <Flex flexDirection="column" alignItems="center">
                <MyFeedIcon />
                {/* <BrowseIcon /> */}
                <StyledText>MY FEED</StyledText>
              </Flex>
            </StyledLink>
          </NavLink>
          <NavLink href={nameRoutes.external.browse}>
            <StyledLink>
              <Flex flexDirection="column" alignItems="center">
                <BrowseIcon />
                <StyledText>BROWSE</StyledText>
              </Flex>
            </StyledLink>
          </NavLink>
          <NavLink href={nameRoutes.external.library} disabled={!isLoggedIn && !assumeLoggedIn}>
            <StyledLink onClick={handleClick}>
              <Flex flexDirection="column" alignItems="center">
                <LibraryIcon />
                <StyledText>LIBRARY</StyledText>
              </Flex>
            </StyledLink>
          </NavLink>
          <NavLink
            href={
              isLoggedIn
                ? `${nameRoutes.external.profile}`
                : `${nameRoutes.external.login}`
            }
          >
            <StyledLink>
              <Flex flexDirection="column" alignItems="center">
                <AccountIcon />
                <StyledText>ACCOUNT</StyledText>
              </Flex>
            </StyledLink>
          </NavLink>
        </StyledBarUI>
      </Container>
    </StyledNav>
  );
}

MobileNav.propTypes = {
  isLoggedIn: PropTypes.bool,
  assumeLoggedIn: PropTypes.bool.isRequired,
};

MobileNav.defaultProps = {
  isLoggedIn: false,
};

export default MobileNav;
