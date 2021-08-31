import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import screen from 'src/styling/screen';
import spacing from 'src/styling/spacing';
import React from 'react';

const headerStyles = css`
  font-family: dunbar-tall, sans-serif;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  margin-top: ${props => spacing[props.mt]};
  margin-bottom: ${props => spacing[props.mb]};
  opacity: ${props => (props.transparent ? 0.6 : 1)};
`;

const HeaderBase = styled.h1.attrs(props => ({
  children: props.text || props.children,
}))`
 ${headerStyles}
`;

const fontSize = ({ desktop, mobile, fontWeight = 'bold', lineHeight = 'normal' }) => css`
  font-size: ${mobile};
  font-weight: ${fontWeight};

  ${screen.mobile} {
    font-size: ${desktop};
    line-height: ${lineHeight};
  }
`;

function getVariant({ as, variant }) {
  const defined = variant || as;
  switch (defined) {
    case 'display':
      return fontSize({ desktop: '40px', mobile: '26px', lineHeight: 1, letterSpacing: 'normal' });
    case 'xxl':
      return fontSize({ desktop: '54px', mobile: '54px', lineHeight: 1, letterSpacing: '-1.13px' });
    case 'xl':
      return fontSize({ desktop: '34px', mobile: '20px', lineHeight: '38px' });
    case 'l':
      return fontSize({ desktop: '22px', mobile: '18px' });
    case 'm':
      return fontSize({ desktop: '20px', mobile: '16px' });
    case 's':
      return fontSize({ desktop: '16px', mobile: '14px' });
    default:
      break;
  }
  return fontSize({ desktop: '20px', mobile: '18px' });
}

const MultiLineEllipsisBase = styled(HeaderBase)`
  display: block; /* Fallback for non-webkit */
  display: -webkit-box; /* stylelint-disable-line value-no-vendor-prefix */
  max-width: 100%;

  color: inherit;
  padding: 0;
  -webkit-box-orient: vertical; /* stylelint-disable-line property-no-vendor-prefix */
  overflow: hidden;
  text-overflow: ellipsis;
`;

const fontSizeEllipsis = ({ mobile, desktop }) => css`
  max-height: calc(${mobile} * ${props => props.lineHeight} * ${props => props.linesToShow} ); /* Fallback for non-webkit */
  font-size: ${mobile};
  line-height: ${props => props.lineHeight};
  -webkit-line-clamp: ${props => props.linesToShow};  /* stylelint-disable-line property-no-vendor-prefix */

  ${screen.mobile} {
    max-height: calc(${desktop} * ${props => props.lineHeight} * ${props => props.linesToShow} ); /* Fallback for non-webkit */
    font-size: ${desktop};
  }
`;

function getEllipsisVariant({ as, variant }) {
  const defined = variant || as;
  switch (defined) {
    case 'display':
      return fontSizeEllipsis({ desktop: '40px', mobile: '26px', letterSpacing: 'normal' });
    case 'xxl':
      return fontSizeEllipsis({ desktop: '54px', mobile: '54px', fontWeight: 900, lineHeight: 1, letterSpacing: '-1.13px' });
    case 'xl':
      return fontSizeEllipsis({ desktop: '34px', mobile: '20px', lineHeight: '38px' });
    case 'l':
      return fontSizeEllipsis({ desktop: '22px', mobile: '18px' });
    case 'm':
      return fontSizeEllipsis({ desktop: '20px', mobile: '16px' });
    case 's':
      return fontSizeEllipsis({ desktop: '16px', mobile: '14px' });
    default:
      break;
  }
  return fontSizeEllipsis({ desktop: '20px', mobile: '18px' });
}

const MultiLineEllipsis = styled(MultiLineEllipsisBase)`
  ${props => getEllipsisVariant(props)};
`;

const HeaderWrapper = styled(HeaderBase)`
  ${props => getVariant(props)};
`;

function Header(props) {
  if (props.linesToShow) {
    return <MultiLineEllipsis {...props}>{props.text || props.children}</MultiLineEllipsis>;
  }
  return <HeaderWrapper {...props}>{props.text || props.children}</HeaderWrapper>;
}

Header.propTypes = {
  /** informs which element to render */
  as: PropTypes.string,
  /** informs which element style to render for semantics, eg: Render a h2 but give it the h3 styling using variant */
  variant: PropTypes.oneOf(['display', 'xxl', 'xl', 'l', 'm', 's']),
  /** header text */
  text: PropTypes.string,
  /** margin-bottom. one of ['none', 'xs', 's', 'm', 'l', 'xl']  */
  mb: PropTypes.oneOf(Object.keys(spacing)),
  /** margin-top. ['none', 'xs', 's', 'm', 'l', 'xl']  */
  mt: PropTypes.oneOf(Object.keys(spacing)),
  /** If the ellipsis is required, inform the number of lines to show */
  linesToShow: PropTypes.number,
  /** If the ellipsis is required, inform the lineHeight */
  lineHeight: PropTypes.number,
  /** Add's transparency */
  transparent: PropTypes.bool,
  children: PropTypes.node,
};

Header.defaultProps = {
  as: 'h1',
  mb: 'none',
  mt: 'none',
  variant: null,
  linesToShow: null,
  lineHeight: 1.2,
  text: '',
  transparent: false,
  children: null,
};

export default Header;
export { headerStyles };
