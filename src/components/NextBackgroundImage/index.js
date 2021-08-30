import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Box } from '@rebass/grid';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';
import Image from 'components/Image';

const NextBackgroundImage = ({ imageUrl, alt, children }) => (
  <Box pb={[spacing.xl, spacing.xxl, spacing.xxl]}>
    <BgWrap>
      <StyledImage
        alt={alt}
        src={imageUrl}
        width="100%"
      />
    </BgWrap>
    <div>
      {children}
    </div>
  </Box>
);

const StyledImage = styled(Image)`
  object-fit: contain;
  object-position: top center;
  
  ${screen.md} {
    object-fit: cover; 
  }
`;

const BgWrap = styled.div`
  position: absolute;
  width: 100vw;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

NextBackgroundImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NextBackgroundImage;
