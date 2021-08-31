import PropTypes from 'prop-types';
import styled from 'styled-components';
import screen from 'src/styling/screen';
import spacing from 'src/styling/spacing';
import React from 'react';

const StyledText = styled.span`
  font-family: ${props => props.theme.bodyFontFamily};
  font-weight: bold;
  font-size: 12px;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 1px;
  opacity: ${props => (props.transparent ? 0.7 : 1)};
  color: ${props => (props.textColor ? props.theme.light : 'inherit')};
  padding: 0 ${props => (props.rightPadding ? props.rightPadding : spacing.m)} 0 ${props => (props.leftPadding ? props.leftPadding : spacing.m)};
`;

const MobileText = styled.span`
  display: inline-block;
  ${screen.tablet} {
    display: none;
   }
`;

const DesktopText = styled.span`
  display: none;
  ${screen.tablet} {
    display: inline-block;
   }
`;

function CTA({ text, mobileText, leftPadding, rightPadding, textColor, transparent, className }) {
  return (
    <div className={className}>
      <DesktopText>
        <StyledText leftPadding={leftPadding} rightPadding={rightPadding} textColor={textColor} transparent={transparent}>{text}</StyledText>
      </DesktopText>
      <MobileText>
        <StyledText leftPadding={leftPadding} rightPadding={rightPadding} textColor={textColor}>
          {!mobileText ? text : mobileText}
        </StyledText>
      </MobileText>
    </div>
  );
}

CTA.propTypes = {
  /** CTA text */
  text: PropTypes.string.isRequired,
  mobileText: PropTypes.string,
  leftPadding: PropTypes.string,
  rightPadding: PropTypes.string,
  textColor: PropTypes.bool,
  transparent: PropTypes.bool,
  className: PropTypes.string,
};

CTA.defaultProps = {
  mobileText: null,
  leftPadding: '0',
  rightPadding: '0',
  textColor: false,
  transparent: false,
  className: '',
};

export default CTA;
