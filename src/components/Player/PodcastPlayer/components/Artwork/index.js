import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Box } from 'components/Grid';
import spacing from 'styles/helpers/spacing';
import screen from 'styles/helpers/media';

const StyledArtwork = styled(Box)`
  width: 70px;
  height: 70px;
  min-width: 70px;
  background-image: ${props => (props.imageUrl ? `url(${props.imageUrl})` : 'none')};
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);

  ${screen.sm} {
    margin-bottom: 0;
    margin-left: ${spacing.xl};
    width: 140px;
    height: 140px;
    min-width: 140px;
  }
`;

function Artwork({ imageUrl }) {
  return <StyledArtwork imageUrl={imageUrl} />;
}

Artwork.propTypes = {
  imageUrl: PropTypes.string,
};

Artwork.defaultProps = {
  imageUrl: '',
};

function mapStateToProps({ episode }) {
  return {
    imageUrl: get(episode, 'show.images.squareLarge.url', null),
  };
}

export default connect(mapStateToProps)(Artwork);
