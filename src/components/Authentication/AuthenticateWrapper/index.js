import { Flex } from 'components/Grid';
import PropTypes, { shape, string } from 'prop-types';
import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import screen from 'styles/helpers/media';
import spacing from 'styles/helpers/spacing';

import AuthenticateHero, { AuthenticateHeroSmartDevice } from './AuthenticateHero';

function AuthenticateWrapper({ isSmartDevice, withHero, smallText, heroText, heroImages, children, button, withRoundedTopBorderMobile, fixedButton }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AuthenticateContainer flexDirection="column">
      {withHero && !isSmartDevice && <AuthenticateHero smallText={smallText} text={heroText} images={heroImages} withRoundedTopBorderMobile={withRoundedTopBorderMobile} />}
      {isSmartDevice && <AuthenticateHeroSmartDevice />}
      <StyledCenteredLayout flexDirection="column" justifyContent="space-between" alignItems="flex-start" withHero={withHero} isSmartDevice={isSmartDevice}>
        {children}
        <ButtonWrapper fixedButton={fixedButton}>
          {button}
        </ButtonWrapper>
      </StyledCenteredLayout>
    </AuthenticateContainer>
  );
}

AuthenticateWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  button: PropTypes.node,
  heroText: PropTypes.string,
  withHero: PropTypes.bool,
  smallText: PropTypes.bool,
  heroImages: shape({
    mobile: string,
    tablet: string,
    desktop: string,
  }),
  withRoundedTopBorderMobile: PropTypes.bool,
  isSmartDevice: PropTypes.bool,
  fixedButton: PropTypes.bool,
};

AuthenticateWrapper.defaultProps = {
  button: null,
  heroText: '',
  smallText: false,
  withHero: true,
  heroImages: {},
  withRoundedTopBorderMobile: false,
  isSmartDevice: false,
  fixedButton: false,
};

const StyledCenteredLayout = styled(Flex)`
  flex-grow: 1;
  padding: ${spacing.l} ${spacing.m} ${spacing.l};
  border: solid 1px rgba(255, 255, 255, 0.16);
  border-top: 0;
  background-color: ${props => props.theme.dark};
  text-align: ${props => (props.isSmartDevice ? 'center' : 'left')};

  ${props => !props.withHero && css`
    border-radius: 0 0 12px 12px;
  `}

  ${screen.sm} {
    height: initial;
    flex-grow: initial;
    ${props => props.withHero && css`
       border-radius: 0 0 12px 12px;
    `}

    ${props => !props.withHero && css`
      border-radius: 12px 12px 12px 12px;
    `}
  }
`;

const AuthenticateContainer = styled(Flex)`
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0;

  ${screen.sm} {
    width: 529px;
    margin: ${spacing.xxl} auto;
  }
`;

const ButtonWrapper = styled.div`
  position: ${props => (props.fixedButton ? 'fixed' : 'absolute')};
  bottom: ${spacing.l};
  width: calc(100% - ${spacing.l});

  ${screen.sm} {
    position: initial;
    width: 100%;
  }
`;

export default AuthenticateWrapper;
