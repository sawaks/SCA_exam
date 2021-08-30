import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import { Box } from 'reflexbox';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import Image from 'components/Image';

const ImageAnimated = (backgroundImageUrl, componentName, title) => {
  const [elementTop, setElementTop] = useState(0);
  const ref = useRef(null);
  const { scrollY } = useViewportScroll();

  const y = useTransform(scrollY, [elementTop, elementTop + 30], [0, -3], {
    clamp: false,
  });

  useLayoutEffect(() => {
    const element = ref.current;
    setElementTop(element.offsetTop);
  }, [ref]);
  return (
    <StyledImage
      width={[1, 1 / 2]}
      pt={[4, 0, 50]}
      pb={[4, 0, 50]}
      pl={componentName === 'twoColCopyRight' ? [10, 25, 50] : 0}
      pr={componentName === 'twoColCopyLeft' ? [10, 25, 0] : [0, 0, 22]}
      ref={ref}
    >
      {backgroundImageUrl
      && (
        <>
          <motion.div className="overlay" style={{ y, zIndex: 1 }}>
            <Image src={backgroundImageUrl} alt={title} rootMarginY="500px" />
          </motion.div>
        </>
      )}
    </StyledImage>
  );
};

const StyledImage = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  align-self: stretch;
  background-color: rgba(32,32,32,1);
  width: 100%;
  ${screen.sm} {
    min-height: 769px;
    width: calc(50% - 16px);
    background-color: transparent;
    ${props => (props.componentName === 'twoColCopyRight' ? 'width: calc(50% - 16px)' : 'width: calc(50% - 100px)')};
  }
  ${screen.md} {
    min-height: none;
    ${props => (props.componentName === 'twoColCopyRight' ? 'width: calc(50% - 50px)' : '')};
  }
  ${screen.lg} {
    ${props => (props.componentName === 'twoColCopyRight' ? 'width: calc(50% - 100px)' : '')};
  }
  img {
    ${screen.md} {
      margin-top: 0;
    }
  }
`;

export default ImageAnimated;
