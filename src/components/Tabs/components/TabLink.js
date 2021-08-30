import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';
import Link from 'next/link';

const StyledTabLink = styled.a`
  cursor: pointer;
  color: ${props => (props.isActive ? props.theme.light : 'rgba(255,255,255,0.7)')};
  font-weight: 600;
  font-family: dunbar-tall, sans-serif;
  letter-spacing: normal;
  text-transform: uppercase;
  /* unique padding numbers required to create the correct pill shape */
  padding: 2px ${spacing.m};
  text-decoration: none;
  justify-content: center;
  align-items: center;
  margin: 6px 6px 6px 0;
  flex-wrap: nowrap;
  white-space: nowrap;
  font-size: 12px;
  height: 30px;
  display: ${props => (props.hide ? 'none' : 'flex')};

  /* this is only for mobile screen */
  border-radius: 60px;
  border-style: solid;
  border-width: 2px;
  border-color: ${props => (props.isActive ? props.theme.light : 'transparent')};

  &:hover {
    color: ${props => props.theme.light};
    text-decoration: none;
  }

  ${screen.md} {
    font-size: 14px;
  }
`;

const TabLink = props => (
  <Link href={props.href}>
    <StyledTabLink {...props}>{props.text}</StyledTabLink>
  </Link>
);

TabLink.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  isActive: PropTypes.bool,
};

TabLink.defaultProps = {
  isActive: false,
  href: '',
};

export default TabLink;
