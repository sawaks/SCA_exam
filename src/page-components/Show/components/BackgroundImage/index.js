import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import screen from '../../../../styles/helpers/media';
import addNavbarHeight from '../../../../styles/helpers/add-navbar-height';

const StyledWrapper = styled(Box)`
  position: relative;
  width: 100%;
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
   width: 100%;
   background-color: ${props => props.bgColor};
   ${addNavbarHeight('height', [290, 390, 593])};
`;

const StyledBackgroundGradient = styled(Box)`
   position: absolute;
   width: inherit;
   height: inherit;
   background: ${props => props.theme.backgroundGradient};
`;

const BackgroundImage = ({ showContents, children }) => {
  const { colourPrimary } = showContents;

  return (
    <StyledWrapper>
      <StyledBackground bgColor={colourPrimary} alignItems="flex-end" justifyContent="center">
        <StyledBackgroundGradient />
      </StyledBackground>
      <StyledChildren>
        {children}
      </StyledChildren>
    </StyledWrapper>
  );
};

BackgroundImage.propTypes = {
  showContents: PropTypes.shape({
    colourPrimary: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
};

BackgroundImage.defaultProps = {
  children: null,
};

export default BackgroundImage;
