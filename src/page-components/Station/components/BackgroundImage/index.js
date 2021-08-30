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
  ${screen.sm} {
    padding-top: 120px;
  }
  ${addNavbarHeight('padding-top', [20, 0, 46])};
`;

const StyledBackground = styled(Flex)`
   position: absolute;
   background: ${props => (props.backgroundImageUrl ? `url(${props.backgroundImageUrl})` : props.backgroundColor)} no-repeat center;
   background-size: cover;
   width: 102%;
   filter: blur(3px);
   ${addNavbarHeight('height', [290, 390, 593])};
`;

const StyledBackgroundGradient = styled(Box)`
   position: absolute;
   width: inherit;
   height: inherit;
   background: ${props => props.theme.backgroundGradient};
`;

const BackgroundImage = ({ backgroundColor, backgroundImage, children }) => (
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
