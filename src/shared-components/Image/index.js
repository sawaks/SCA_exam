import React from 'react';
import { number, string, oneOfType, bool } from 'prop-types';
import { useInView } from 'react-intersection-observer';
import styled, { css } from 'styled-components';

const StyledImage = styled.img`
opacity: 0;
transition: opacity 1s;
${props => (props.imageReady && css`
  opacity: 1;
`)};
`;

const Image = ({ width, height, src, alt, rootMarginY, ...rest }) => {
  const { ref, inView } = useInView({
    rootMargin: `${rootMarginY} 0px`,
    triggerOnce: true,
  });

  return (

    <StyledImage
      {...rest}
      ref={ref}
      src={inView ? src : ''}
      width={width}
      height={height}
      loading="lazy"
      alt={alt}
      imageReady={inView}
    />
  );
};

Image.propTypes = {
  width: oneOfType([string, number]),
  height: oneOfType([string, number]),
  src: string.isRequired,
  alt: string,
  rootMarginY: string,
  imageReady: bool,
};

Image.defaultProps = {
  width: '100%',
  height: '100%',
  alt: '',
  rootMarginY: '120px',
  imageReady: false,
};

export default Image;
