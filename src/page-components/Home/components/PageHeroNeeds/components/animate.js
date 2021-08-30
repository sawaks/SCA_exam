import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import { easeOutQuart } from 'utilities/helpers/easingFunctions';
import { isMobile } from 'utilities/helpers/getDeviceInfo';

const Animate = ({ outputRange, children }) => {
  const ref = useRef();
  const { scrollY } = useViewportScroll();
  const [elementTop, setElementTop] = useState(0);
  const [isMobileDevice, setMobileDevice] = useState(false);

  const y = useTransform(scrollY, [elementTop + 20, elementTop + 600], outputRange, { ease: [easeOutQuart] });

  useLayoutEffect(() => {
    if (ref.current) {
      setElementTop(ref.current.offsetTop);
    }
  }, [ref]);

  useEffect(() => {
    setMobileDevice(isMobile);
  }, [isMobile]);

  // dont run animation on mobile
  if (isMobileDevice) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ y: 0 }}
      style={{ y, height: 'inherit', width: '100%', position: 'absolute' }}
    >
      {children}
    </motion.div>
  );
};

Animate.propTypes = {
  children: PropTypes.node.isRequired,
  outputRange: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Animate;
