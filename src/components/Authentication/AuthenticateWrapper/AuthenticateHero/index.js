import Header from 'components/Typography/Header';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { bool, shape, string } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import Logo from '../../../Icons/listnr-logo.svg';
import { Box, Flex } from '../../../Grid';
import spacing from '../../../../styles/helpers/spacing';

function AuthenticateHero({ text, smallText, images, withRoundedTopBorderMobile }) {
  return (
    <StyledHeader images={images} withRoundedTopBorderMobile={withRoundedTopBorderMobile}>
      <HeaderTitle smallText={smallText}>
        <Header variant={smallText ? 'xl' : 'xxl'} as="h1" text={text} style={{ lineHeight: smallText ? 1.12 : 1 }} />
      </HeaderTitle>
    </StyledHeader>
  );
}

export function AuthenticateHeroSmartDevice() {
  return (
    <StyledHeaderSmartDevices flexDirection="column" justifyContent="center" alignItems="center">
      <Box pb={spacing.l} pt={spacing.xl}>
        <Logo />
      </Box>
    </StyledHeaderSmartDevices>
  );
}

AuthenticateHero.propTypes = {
  text: string,
  smallText: bool,
  images: shape({
    mobile: string,
    tablet: string,
    desktop: string,
  }),
  withRoundedTopBorderMobile: bool,
};

AuthenticateHero.defaultProps = {
  text: '',
  smallText: false,
  images: {},
  withRoundedTopBorderMobile: false,
};

const StyledHeaderSmartDevices = styled(Flex)`
  border: solid 1px rgba(255, 255, 255, 0.16);
  border-radius: 12px 12px 0 0;
  border-bottom: none;
  background-color: ${props => props.theme.dark};
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-radius: ${props => (props.withRoundedTopBorderMobile ? '12px 12px 0 0' : 0)};
  background: ${props => (isEmpty(props.images) ? 'none' : `url(${get(props, 'images.mobile')})`)} no-repeat center;
  background-size: ${props => (props.hello ? 'initial' : 'cover')};
  height: 214px;

 ${screen.sm}{
    border-radius: 12px 12px 0 0;
    background: ${props => (isEmpty(props.images) ? 'none' : `url(${get(props, 'images.tablet')})`)} no-repeat center;
    background-size: 102% auto;
    height: 220px;
  }

  ${screen.md}{
    background: ${props => (isEmpty(props.images) ? 'none' : `url(${get(props, 'images.desktop')})`)} no-repeat center;
    background-size: cover;
  }
`;

const HeaderTitle = styled.div`
  margin-left: 14px;
  margin-bottom: ${props => (props.smallText ? '12px' : '15px')};
  width: 50%;
`;

export default AuthenticateHero;
