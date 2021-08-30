import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import screen from 'styles/helpers/media';
import addNavbarHeight from 'styles/helpers/add-navbar-height';

const StyledWrapper = styled(Box)`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const StyledChildren = styled(Box)`
  position: relative;
   ${addNavbarHeight('padding-top', [10, 70, 135])};
   ${screen.sm} {
    ${addNavbarHeight('padding-top', [90, 70, 135])};
  }
`;

const StyledBackground = styled(Flex)`
  position: absolute;
  background: ${props => (props.backgroundImageUrl ? `url(${props.backgroundImageUrl})` : props.backgroundColor)} no-repeat center;
  background-size: cover;
  width: 105%;
  margin-left: -12px;
  filter: blur(3px);
  ${addNavbarHeight('height', [321, 410, 674])};
`;

const StyledBackgroundGradient = styled(Box)`
  position: absolute;
  bottom: 0;
  width: inherit;
  height: 273px;
  ${screen.md} {
    height: 246px;
  }
  ${screen.lg} {
    height: 461px;
  }
  background: ${props => props.theme.backgroundGradient};
`;

const BackgroundImage = ({ backgroundImage, backgroundColor, children }) => (
  <StyledWrapper>
    <StyledBackground backgroundColor={backgroundColor} backgroundImageUrl={backgroundImage} alignItems="center" justifyContent="center">
      <StyledBackgroundGradient />
    </StyledBackground>
    <StyledChildren>
      {children}
    </StyledChildren>
  </StyledWrapper>
);

BackgroundImage.propTypes = {
  backgroundImage: PropTypes.string,
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
};

BackgroundImage.defaultProps = {
  children: null,
  backgroundImage: null,
  backgroundColor: null,
};

export default BackgroundImage;
