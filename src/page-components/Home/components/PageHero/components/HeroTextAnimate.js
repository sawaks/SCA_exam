import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import Header from 'components/Typography/Header';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import { Flex } from 'components/Grid';

const HeroTextAnimate = ({ name }) => {
  const { scrollY } = useViewportScroll();
  const [elementTop, setElementTop] = useState(0);
  const ref = useRef();

  const y = useTransform(scrollY, [elementTop, elementTop + 500], ['0%', '-400%']);

  useLayoutEffect(() => {
    if (ref.current) {
      setElementTop(ref.current.offsetTop);
    }
  }, [ref]);

  return (
    <Wrapper>
      <motion.div
        ref={ref}
        initial={{ y: 0 }}
        style={{ y }}
      >
        <StyleHeroText>
          <Header as="h1" variant="xl" text={name} />
        </StyleHeroText>
      </motion.div>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
    position: relative;
`;

const StyleHeroText = styled(Flex)`
    h1 {
      line-height: 66px;
    }
    ${screen.md} {
      h1 {
         line-height: 95px;
      }
    }
`;

HeroTextAnimate.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HeroTextAnimate;
