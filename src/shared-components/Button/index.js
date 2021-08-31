import CTA from 'shared-components/Typography/CallToAction';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ButtonIcon from './ButtonIcon';
import Spinner from './Spinner';
import { BaseButton, IconButton, MonoButton, PrimaryButton, QuaternaryButton, QuinaryButton, SecondaryButton, TertiaryButton } from './styles';

const getTextVariant = ({ text, mobileText, icon: Icon, iconHighlighted, submitting }) => {
  if (submitting) {
    return <Spinner />;
  }
  if (Icon) {
    return <ButtonIcon text={text} mobileText={mobileText} icon={Icon} highlighted={iconHighlighted} />;
  }
  return <CTA text={text} mobileText={mobileText} />;
};

const getButtonVariant = (props) => {
  const { variant } = props;
  switch (variant) {
    case 'primary':
      return PrimaryButton;
    case 'secondary':
      return SecondaryButton;
    case 'tertiary':
      return TertiaryButton;
    case 'quaternary':
      return QuaternaryButton;
    case 'quinary':
      return QuinaryButton;
    case 'mono':
      return MonoButton;
    case 'icon':
      return IconButton;
    default:
      return PrimaryButton;
  }
};

const StyledButton = styled(BaseButton)`
  ${props => getButtonVariant(props)};
`;

function Button(props) {
  if (props.as === 'a' && props.link) {
    return (
      <Link {...props.link}>
        <StyledButton {...props}>
          { getTextVariant(props) }
        </StyledButton>
      </Link>
    );
  }

  return (
    <StyledButton {...props}>
      { getTextVariant(props) }
    </StyledButton>
  );
}

Button.propTypes = {
  // Set the element type
  as: PropTypes.oneOf(['a', 'button']),
  // Set link object
  link: PropTypes.shape({
    as: PropTypes.string,
    href: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        path: PropTypes.string,
        query: PropTypes.objectOf(PropTypes.object),
      }),
    ]),
  }),
  minWidthMobile: PropTypes.string,
  maxWidthMobile: PropTypes.string,
  minWidthDesktop: PropTypes.string,
  maxWidthDesktop: PropTypes.string,
  disabled: PropTypes.bool,
  submitting: PropTypes.bool,
  padding: PropTypes.string,
};

Button.defaultProps = {
  link: { as: '', href: '' },
  as: 'button',
  minWidthMobile: null,
  maxWidthMobile: null,
  minWidthDesktop: null,
  maxWidthDesktop: null,
  disabled: false,
  submitting: false,
  padding: '0 24px',
};

getButtonVariant.propTypes = {
  // Set the button type
  variant: PropTypes.oneOf(['primary', 'secondary', 'secondary', 'tertiary', 'icon']),
  onClick: PropTypes.func,
  showBorder: PropTypes.bool,
};

getButtonVariant.defaultProps = {
  variant: 'primary',
  onClick: null,
};

getTextVariant.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.element,
    PropTypes.symbol,
  ]),
  text: PropTypes.string,
  // text to display on mobile.
  mobileText: PropTypes.string,
  iconHighlighted: PropTypes.bool,
  submitting: PropTypes.bool.isRequired,
};

getTextVariant.defaultProps = {
  icon: null,
  text: null,
  iconHighlighted: false,
  mobileText: null,
};
export default Button;
