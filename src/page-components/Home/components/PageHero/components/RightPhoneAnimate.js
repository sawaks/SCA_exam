import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import { easeInQuart } from 'utilities/helpers/easingFunctions';

const RightPhoneAnimate = ({ imgSrc }) => {
  const { scrollY } = useViewportScroll();
  const [elementTop, setElementTop] = useState(0);
  const ref = useRef();

  const y = useTransform(scrollY, [elementTop, elementTop + 200], ['0%', '-100%'], { ease: [easeInQuart] });
  const opacity = useTransform(scrollY, [elementTop, elementTop + 180, elementTop + 200], [1, 0.85, 0]);

  useLayoutEffect(() => {
    if (ref.current) {
      setElementTop(ref.current.offsetTop);
    }
  }, [ref]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 0 }}
      style={{ y, opacity }}
    >
      <PhoneRightImg src={imgSrc} alt="phone left" />
    </motion.div>
  );
};

const PhoneRightImg = styled.img`
  width: 19vh;
  max-width: 200px;
  object-fit: contain;
  object-position: top right;
  overflow: hidden;

  ${screen.md} {
     width: 225px;
  }
`;

RightPhoneAnimate.propTypes = {
  imgSrc: PropTypes.string.isRequired,
};

export default RightPhoneAnimate;
