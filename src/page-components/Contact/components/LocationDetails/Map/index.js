import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import screen from 'styles/helpers/media';

export function Map({ src }) {
  const StyledMap = styled.div`
  iframe {
    height: 250px;
    ${screen.md} {
      height: 400px;
    }
  } 
  `;

  return (
    <StyledMap>
      <iframe
        src={src}
        width="100%"
        frameBorder="0"
        title="map"
      />
    </StyledMap>
  );
}

Map.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Map;
