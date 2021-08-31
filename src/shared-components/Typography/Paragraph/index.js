/* eslint-disable no-nested-ternary */
/* stylelint-disable value-no-vendor-prefix, property-no-vendor-prefix */
import React from 'react';
import styled, { css } from 'styled-components';
import { oneOf, string, node, bool, number, oneOfType } from 'prop-types';
import screen from 'src/styling/screen';
import spacing from 'src/styling/spacing';

const paragraphStyles = css`
  font-family: ${props => props.theme.bodyFontFamily};
  font-weight: ${props => props.fontWeight};
  font-style: normal;
  font-stretch: normal;
  line-height: ${props => `${props.lineHeight}`};
  letter-spacing: normal;
  white-space: ${props => props.whiteSpace};
  margin-top: ${props => spacing[props.mt]};
  margin-right: ${props => spacing[props.mr]};
  margin-bottom: ${props => spacing[props.mb]};
  margin-left: ${props => spacing[props.ml]};
  text-decoration: ${props => (props.underline ? 'underline' : 'initial')};
  opacity: ${props => (props.opacity ? props.opacity : (props.transparent ? 0.7 : 1))};
`;

const ParagraphBase = styled.p.attrs(props => ({
  children: props.text || props.children,
}))`
  ${paragraphStyles}
`;

const MultiLineEllipsisBase = styled(ParagraphBase)`
  display: block; /* Fallback for non-webkit */
  display: -webkit-box;
  max-width: 100%;
  color: inherit;
  padding: 0;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

const fontSize = ({ mobile, desktop }) => css`
  font-size: ${mobile};

  ${screen.tablet} {
    font-size: ${desktop};
  }
`;

const fontSizeEllipsis = ({ mobile, desktop }) => css`
  max-height: calc(${mobile} * ${props => props.lineHeight} * ${props => props.linesToShow} ); /* Fallback for non-webkit */
  font-size: ${mobile};
  line-height: ${props => props.lineHeight};
  -webkit-line-clamp: ${props => props.linesToShow};

  ${screen.tablet} {
    max-height: calc(${desktop} * ${props => props.lineHeight} * ${props => props.linesToShow} ); /* Fallback for non-webkit */
    font-size: ${desktop};
  }
`;

function getParagraphVariant({ variant }) {
  switch (variant) {
    case 'xl':
      return fontSize({ mobile: '16px', desktop: '18px' });
    case 'l':
      return fontSize({ mobile: '14px', desktop: '16px' });
    case 'm':
      return fontSize({ mobile: '12px', desktop: '14px' });
    case 's':
      return fontSize({ mobile: '10px', desktop: '12px' });
    default:
      break;
  }
  return fontSize({ mobile: '12px', desktop: '14px' });
}

function getEllipsisVariant({ variant }) {
  switch (variant) {
    case 'xl':
      return fontSizeEllipsis({ mobile: '16px', desktop: '18px' });
    case 'l':
      return fontSizeEllipsis({ mobile: '14px', desktop: '16px' });
    case 'm':
      return fontSizeEllipsis({ mobile: '12px', desktop: '14px' });
    case 's':
      return fontSizeEllipsis({ mobile: '10px', desktop: '12px' });
    default:
      break;
  }
  return fontSizeEllipsis({ mobile: '12px', desktop: '14px' });
}

const ParagraphWrapper = styled(ParagraphBase)`
  ${props => getParagraphVariant(props)};
`;

const MultiLineEllipsis = styled(MultiLineEllipsisBase)`
  ${props => getEllipsisVariant(props)};
`;

function Paragraph(props) {
  if (props.linesToShow) {
    return <MultiLineEllipsis {...props}>{props.text || props.children}</MultiLineEllipsis>;
  }
  return <ParagraphWrapper {...props}>{props.text || props.children}</ParagraphWrapper>;
}

Paragraph.propTypes = {
  /** informs which element style to variant) */
  variant: oneOf(['xl', 'l', 'm', 's']),
  text: string,
  children: node,
  mb: oneOf(Object.keys(spacing)),
  whiteSpace: oneOf(['inherit', 'initial', 'normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'unset']),
  /** margin-top. ['none', 'xs', 's', 'm', 'l', 'xl']  */
  mt: oneOf(Object.keys(spacing)),
  /** margin-left. ['none', 'xs', 's', 'm', 'l', 'xl']  */
  ml: oneOf(Object.keys(spacing)),
  /** margin-right. ['none', 'xs', 's', 'm', 'l', 'xl']  */
  mr: oneOf(Object.keys(spacing)),
  /** whether the text is 60% transparent or not */
  transparent: bool,
  underline: bool,
  opacity: number,
  /** If the ellipsis is required, inform the number of lines to show */
  linesToShow: number,
  /** If the ellipsis is required, inform the lineHeight */
  lineHeight: oneOfType([string, number]),
  fontWeight: oneOfType([string, number]),
};

Paragraph.defaultProps = {
  variant: 'm',
  text: null,
  whiteSpace: 'initial',
  mb: 'none',
  mt: 'none',
  ml: 'none',
  mr: 'none',
  transparent: false,
  underline: false,
  opacity: null,
  linesToShow: null,
  lineHeight: 'normal',
  fontWeight: 'normal',
  children: null,
};

export default Paragraph;
export { paragraphStyles };
