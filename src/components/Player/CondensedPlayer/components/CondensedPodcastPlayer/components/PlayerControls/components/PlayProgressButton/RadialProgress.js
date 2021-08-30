import React from 'react';
import { number } from 'prop-types';
import themes from 'styles/theme';
import styled from 'styled-components';
import screen from 'styles/helpers/media';

const INITIAL_OFFSET = 25;
const circleConfig = {
  viewBox: '0 0 38 38',
  x: '19',
  y: '19',
  radius: '15.915',
};

const RadialProgress = ({ percentage }) => (
  <StyledSvg viewBox={circleConfig.viewBox}>
    <circle
      cx={circleConfig.x}
      cy={circleConfig.y}
      r={circleConfig.radius}
      fill="none"
      stroke={themes.pale}
      strokeWidth={2}
    />
    <circle
      cx={circleConfig.x}
      cy={circleConfig.y}
      r={circleConfig.radius}
      fill="none"
      stroke={themes.primary}
      strokeWidth={2}
      strokeDasharray={`${percentage} ${100 - percentage}`}
      strokeDashoffset={INITIAL_OFFSET}
    />
  </StyledSvg>
);

const StyledSvg = styled.svg`
  ${screen.md} {
    display: none;
  }
`;

RadialProgress.propTypes = {
  percentage: number,
};

RadialProgress.defaultProps = {
  percentage: 0,
};
export default RadialProgress;
