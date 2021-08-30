import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rebass/grid';
import spacing from '../../styles/helpers/spacing';
import screen from '../../styles/helpers/media';

const StyledImageContainer = styled(Box)`
  flex-shrink: 0;
  border-radius: 8px;
  margin-right: ${spacing.m};
  overflow: hidden;
  width: 130px;
  height: 130px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
  background-color: ${props => props.backgroundColour};


  ${screen.md} {
    width: 320px;
    height: 320px;
    border-radius: 12px;
  }
`;

const StyledImage = styled.img`
  object-fit: contain;
`;

const CreatorImage = ({ imageUrl, title, backgroundColour }) => (
  <>
    <StyledImageContainer backgroundColor={backgroundColour}>
      <StyledImage
        src={imageUrl}
        width="100%"
        height="100%"
        alt={title}
      />
    </StyledImageContainer>
  </>
);

CreatorImage.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  backgroundColour: PropTypes.string,
};

CreatorImage.defaultProps = {
  imageUrl: null,
  title: 'Creator',
  backgroundColour: null,
};

export default CreatorImage;
