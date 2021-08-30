import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import screen from 'styles/helpers/media';
import addNavbarHeight from 'styles/helpers/add-navbar-height';

const StyledWrapper = styled(Box)`
  position: relative;
  width: 100%;
`;

const StyledChildren = styled(Box)`
  position: relative;
   ${addNavbarHeight('padding-top', [10, 213, 213])};
`;

const StyledBackground = styled(Flex)`
   position: absolute;
   background: ${props => props.theme.primaryActive} no-repeat center;
   background-size: cover;
   width: 100%;
   ${addNavbarHeight('height', [321, 674, 674])};

`;

const StyledBackgroundImage = styled(Box)`
  width: inherit;
  height: 395px;
  position: absolute;
  ${addNavbarHeight('top', [0, 16, 16])};
`;

const StyledImage = styled(Box)`
  width: 226px;
  height: 226px;
  overflow: hidden;
  
  ${screen.md} {
    width: 395px;
    height: 395px;
  }
`;

const StyledBackgroundGradient = styled(Box)`
   position: absolute;
   ${addNavbarHeight('top', [169, 213, 213])};
   width: inherit;
   height: 273px;
   background: ${props => props.theme.backgroundGradient};
    ${screen.md} {
      height: 461px;
    }
`;

const BackgroundImage = ({ backgroundImageUrl, children }) => (
  <StyledWrapper>
    <StyledBackground alignItems="center" justifyContent="center">
      <StyledBackgroundImage>
        <Flex justifyContent="center" alignItems="center">
          <StyledImage>
            { backgroundImageUrl
              && (
                <img src={backgroundImageUrl} width="100%" alt="Talent" />
              ) }
          </StyledImage>
        </Flex>
      </StyledBackgroundImage>
      <StyledBackgroundGradient />
    </StyledBackground>
    <StyledChildren>
      {children}
    </StyledChildren>
  </StyledWrapper>
);

BackgroundImage.propTypes = {
  backgroundImageUrl: PropTypes.string,
  children: PropTypes.node,
};

BackgroundImage.defaultProps = {
  children: null,
  backgroundImageUrl: null,
};

export default BackgroundImage;
