import * as PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Constants
// Keyframe values for scaleY in active
const scaleAnim = [0.4, 0.8, 1, 0.7, 0.3, 0.7, 0.8, 0.2, 0.7, 0.5];
// Static values for scaleY in inactive
const scaleStatic = [0.4, 0.2, 1, 0.6, 0.2];
// delay values for each Bar
const delayArray = [0.8, 0.2, 0.5, 0, 0.3];

const variant = {
  active: i => ({
    scaleY: scaleAnim,
    originY: 'bottom',
    transition: { ease: 'easeInOut', duration: 2.5, repeat: Infinity, delay: delayArray[i] },
  }),
  inactive: i => ({
    scaleY: scaleStatic[i],
    originY: 'bottom',
  }),
  init: {
    scaleY: 0,
  },
};

function Equaliser({ playing }) {
  return (
    <EqualiserWrapper animate={playing ? 'active' : 'inactive'}>
      <Bar variants={variant} initial="init" custom={0} />
      <Bar variants={variant} initial="init" custom={1} />
      <Bar variants={variant} initial="init" custom={2} />
      <Bar variants={variant} initial="init" custom={3} />
      <Bar variants={variant} initial="init" custom={4} />
    </EqualiserWrapper>
  );
}

Equaliser.propTypes = {
  playing: PropTypes.bool,
};

Equaliser.defaultProps = {
  playing: false,
};

const Bar = styled(motion.div)`
  width: 2px;
  height: 15px;
  border-radius: 4px;
  background: ${props => props.theme.primary};
`;

const EqualiserWrapper = styled(motion.div)`
  display: flex;
  width: 18px;
  margin: 0 12px 0 8px;
  justify-content: space-between;
  align-items: baseline;
`;

export default Equaliser;
