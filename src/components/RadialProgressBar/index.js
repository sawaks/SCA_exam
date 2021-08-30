import React from 'react';
import { number, bool } from 'prop-types';
import styled from 'styled-components';
import screen from 'styles/helpers/media';
import theme from 'styles/theme';

const INITIAL_OFFSET = 25;
const circleConfig = {
  viewBox: '0 0 38 38',
  x: '19',
  y: '19',
  radius: '15.915',
};

const StyledSvg = styled.svg`
  ${screen.md} {
     display: ${props => (props.hideOnDesktop ? 'none' : 'inherit')};
  }
`;

const RadialProgressBar = ({
  strokeWidth,
  percentage,
  trailStrokeWidth,
  lightMode,
  hideOnDesktop,
}) => (
  <StyledSvg viewBox={circleConfig.viewBox} hideOnDesktop={hideOnDesktop}>
    <circle
      cx={circleConfig.x}
      cy={circleConfig.y}
      r={circleConfig.radius}
      fill="transparent"
      stroke={lightMode ? theme.lightslategray : theme.light}
      strokeWidth={trailStrokeWidth}
      strokeDasharray={0}
    />

    <circle
      cx={circleConfig.x}
      cy={circleConfig.y}
      r={circleConfig.radius}
      fill="transparent"
      stroke={theme.primary}
      strokeWidth={strokeWidth}
      strokeDasharray={`${percentage} ${100 - percentage}`}
      strokeDashoffset={INITIAL_OFFSET}
    />
  </StyledSvg>
);

RadialProgressBar.propTypes = {
  strokeWidth: number,
  percentage: number,
  trailStrokeWidth: number,
  lightMode: bool,
  hideOnDesktop: bool,
};

RadialProgressBar.defaultProps = {
  strokeWidth: 7,
  percentage: 0,
  trailStrokeWidth: 6,
  lightMode: false,
  hideOnDesktop: false,
};

export default RadialProgressBar;
