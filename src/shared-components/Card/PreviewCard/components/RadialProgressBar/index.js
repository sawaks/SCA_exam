import React from 'react';
import { number } from 'prop-types';
import themes from 'src/styling/theme';
import styled from 'styled-components';

const INITIAL_OFFSET = 27.88;
const circleConfig = {
  viewBox: '0 0 38 38',
  x: '19',
  y: '19',
  radius: '17.75',
};

const RadialProgressBar = ({ percentage }) => {
  // The bigger the radius the bigger the circle.
  // Circumference, C = 2πr

  const circumference = 111.53;
  const progress = percentage * 1.1153;
  return (

    <svg viewBox={circleConfig.viewBox}>
      <circle
        cx={circleConfig.x}
        cy={circleConfig.y}
        r={circleConfig.radius}
        fill="none"
        stroke={progress === 0 ? themes.dark : themes.light}
        strokeWidth={progress === 0 ? '0' : '2.5'}
      />
      <StyledInnerCircle
        cx={circleConfig.x}
        cy={circleConfig.y}
        r={circleConfig.radius}
        fill="none"
        stroke={themes.primary}
        strokeWidth={progress === 0 ? '0' : '2.5'}
        strokeDasharray={`${progress} ${circumference - progress}`}
        strokeDashoffset={INITIAL_OFFSET}
        progress={progress}
      />
    </svg>

  );
};
const StyledInnerCircle = styled.circle`
  transition-property: stroke-dasharray;
  transition-duration: 1s;
  transition-timing-function: linear;
  opacity: ${props => (props.progress !== 0 ? 1 : 0)};
`;

RadialProgressBar.propTypes = {
  percentage: number,
};

RadialProgressBar.defaultProps = {
  percentage: 0,
};
export default RadialProgressBar;
