/* stylelint-disable value-no-vendor-prefix, property-no-vendor-prefix */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import screen from 'src/styling/screen';
import spacing from 'src/styling/spacing';
import React from 'react';

const TagBase = styled.p.attrs(props => ({
  children: props.text || props.children,
}))`
  font-family: ${props => props.theme.bodyFontFamily};
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  white-space: ${props => props.whiteSpace};
  margin-top: ${props => spacing[props.mt]};
  margin-right: ${props => spacing[props.mr]};
  margin-bottom: ${props => spacing[props.mb]};
  margin-left: ${props => spacing[props.ml]};
  opacity: ${props => (props.transparent ? 0.7 : 1)};
  text-transform: uppercase;
`;

const MultiLineEllipsisBase = styled(TagBase)`
  display: block; /* Fallback for non-webkit */
  display: -webkit-box;
  max-width: 100%;
  color: inherit;
  padding: 0;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TagWrapper = styled(TagBase)`
  font-size: 10px;
  font-weight: bold;

  ${screen.tablet} {
    font-size: 12px;
  }
`;

const MultiLineEllipsis = styled(MultiLineEllipsisBase)`
  font-weight: 500;
  max-height: calc(10 * ${props => props.lineHeight} * ${props => props.linesToShow} ); /* Fallback for non-webkit */
  font-size: 10px;
  line-height: ${props => props.lineHeight};
  -webkit-line-clamp: ${props => props.linesToShow};

  ${screen.tablet} {
    max-height: calc(12 * ${props => props.lineHeight} * ${props => props.linesToShow} ); /* Fallback for non-webkit */
    font-size: 12px;
  }
`;

function Tag(props) {
  if (props.linesToShow) {
    return <MultiLineEllipsis {...props}>{props.text || props.children}</MultiLineEllipsis>;
  }
  return <TagWrapper {...props}>{props.text || props.children}</TagWrapper>;
}

Tag.propTypes = {
  /** informs which element style to variant) */
  text: PropTypes.string,
  children: PropTypes.node,
  whiteSpace: PropTypes.oneOf(['inherit', 'initial', 'normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'unset']),
  mt: PropTypes.oneOf(Object.keys(spacing)),
  mb: PropTypes.oneOf(Object.keys(spacing)),
  ml: PropTypes.oneOf(Object.keys(spacing)),
  mr: PropTypes.oneOf(Object.keys(spacing)),
  transparent: PropTypes.bool,
  linesToShow: PropTypes.number,
  lineHeight: PropTypes.number,
};

Tag.defaultProps = {
  text: null,
  whiteSpace: 'initial',
  mb: 'none',
  mt: 'none',
  ml: 'none',
  mr: 'none',
  transparent: false,
  linesToShow: null,
  lineHeight: 1.2,
  children: null,
};

export default Tag;
