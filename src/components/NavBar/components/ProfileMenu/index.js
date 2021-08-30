import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import Link from 'next/link';
import nameRoutes from 'common/named-routes';
import gtm from 'utilities/GTM/gtmTags';
import addToDataLayer from 'utilities/helpers/dataLayer';
import ProfileIcon from 'components/Icons/profile.svg';

const StyledMenu = styled.a`
  & button {
    color: ${props => props.theme.LEGACY_secondary};
    text-decoration: none;
    border: none;
    background:none;
    cursor: pointer;
    height: 32px;
  }
`;

const StyledIcon = styled.div`
  margin: 0 5px;

  ${screen.md} {
      margin: 0 5px 0 10px;
      display: flex;
  }

  > svg path {
    transition: stroke 0.2s ease;
  }

  &:hover, &:focus {
    svg path {
      stroke: ${props => props.theme.primary};
    }
  }
`;

const LoggedInInitials = styled.div`
  height: 44px;
  width: 44px;
  border-radius: 23px;
  background-color: ${props => props.theme.dark};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: dunbar-tall, sans-serif;
  font-size: 14px;
  font-weight: bold;
  line-height: 0.86;
  letter-spacing: 0;
  transition:
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover, &:focus {
    border-color: ${props => props.theme.primary};
    color: ${props => props.theme.primary};
  }
`;

export function ProfileMenu({ isLoggedIn, firstName, lastName }) {
  return (
    <Link href={isLoggedIn ? `${nameRoutes.external.profile}` : `${nameRoutes.external.login}`} passHref>
      <StyledMenu onClick={() => addToDataLayer({ event: gtm.loginClicked })} data-test="profile-nav-link">
        <StyledIcon>
          {(isLoggedIn && firstName) || (isLoggedIn && lastName)
            ? (
              <LoggedInInitials data-test="profile-initials">
                {firstName && firstName.charAt(0)}
                {lastName && lastName.charAt(0)}
              </LoggedInInitials>
            )
            : <ProfileIcon />
          }
        </StyledIcon>
      </StyledMenu>
    </Link>
  );
}

ProfileMenu.propTypes = {
  isLoggedIn: PropTypes.bool,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

ProfileMenu.defaultProps = {
  isLoggedIn: false,
  firstName: '',
  lastName: '',
};

export default ProfileMenu;
