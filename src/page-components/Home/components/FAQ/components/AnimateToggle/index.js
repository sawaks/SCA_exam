import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';

const AnimateToggle = ({ visible, children }) => (
  <>
    <AnimatePresence initial={false}>
      {visible && (
        <motion.section
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <motion.div
            variants={{ collapsed: { scale: 0.95 }, open: { scale: 1 } }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  </>
);

AnimateToggle.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default AnimateToggle;
