import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import spacing from 'src/styling/spacing';
import screen from 'src/styling/screen';
import Divider from 'shared-components/Divider';

const StyleChildren = styled.div`
  height: 100%;
  width: inherit;
  padding-bottom: ${props => (props.smallBottomPadding ? spacing.m : spacing.l)} 0;

  &:empty {
    display: none;
  }

  ${screen.tablet} {
    padding-bottom: ${props => (props.smallBottomPadding ? spacing.l : spacing.xl)};
   }
`;

function Section(props) {
  return (
    <div className={props.className}>
      {props.top && <Divider />}
      <StyleChildren {...props}>
        {props.children}
      </StyleChildren>
    </div>
  );
}

Section.propTypes = {
  /* Change bottom padding from 48px to 24px on desktop */
  smallBottomPadding: PropTypes.bool,
  top: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Section.defaultProps = {
  top: false,
  smallBottomPadding: false,
  className: '',
};

export default Section;
