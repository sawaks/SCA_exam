import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Header from 'shared-components/Typography/Header';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const AnimatedHeader = ({ as, variant, text }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start();
    }
  }, [controls, inView]);

  return (
    <TextWrapper ref={ref}>
      <motion.div
        initial={{ y: 100 }}
        animate={inView ? { y: 0 } : ''}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <Header as={as} variant={variant} text={text} />
      </motion.div>
    </TextWrapper>
  );
};

AnimatedHeader.propTypes = {
  as: PropTypes.string,
  variant: PropTypes.string,
  text: PropTypes.string,
};

AnimatedHeader.defaultProps = {
  as: 'h1',
  variant: 'xl',
  text: '',
};

const TextWrapper = styled.div`
  overflow: hidden;
`;

export default AnimatedHeader;
