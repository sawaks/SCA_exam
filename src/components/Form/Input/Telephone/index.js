import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Form/Input';
import isMobilePhone from 'validator/lib/isMobilePhone';

function validator(value) {
  return value && isMobilePhone(value, 'en-AU') ? undefined : 'Your phone number is invalid. It should start with 0 or +61 and be a mobile phone number';
}

function Telephone({ name, label, disabled }) {
  return (
    <Input
      name={name}
      label={label}
      validate={validator}
      disabled={disabled}
    />
  );
}

Telephone.propTypes = {
  /** The name for the component. Your data will be returned by this key in the form onSubmit function. */
  name: PropTypes.string,
  /** The label that should be displayed at the top of the component. */
  label: PropTypes.string,
  /** Whether the input is disabled or not. */
  disabled: PropTypes.bool,
};

Telephone.defaultProps = {
  name: 'phone',
  label: 'Phone number',
  disabled: false,
};

export default Telephone;
