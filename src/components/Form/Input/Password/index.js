import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Form/Input';
import HidePasswordIcon from 'components/Icons/hide-password.svg';
import ShowPasswordIcon from 'components/Icons/show-password.svg';

const validator = (value) => {
  if (!value || !value.length) {
    return 'Please enter a password';
  }

  if (value.length < 6) {
    return 'Password must be more than 6 characters';
  }

  const alphanumeric = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z\\¡£¢∞§¶•≠“‘«¬…≈√∫≤≥÷!@#$%^&*()_+={}|\\:;\\"<>,.?/\]\\[-]{6,}$/;

  if (!alphanumeric.test(value)) {
    return 'Password to be 6 characters minimum, containing at least one number and one alphabetic, optionally special characters, with no spaces';
  }
  return null;
};

const Password = forwardRef(({ name, label, disabled, dontValidate, wrongPassword }, ref) => {
  const [type, setType] = useState('password');

  const handleRightIconClick = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  return (
    <Input
      name={name}
      label={label}
      validate={dontValidate ? null : validator}
      type={type}
      disabled={disabled}
      rightIcon={type === 'password' ? <HidePasswordIcon /> : <ShowPasswordIcon />}
      onRightIconClick={handleRightIconClick}
      wrongPassword={wrongPassword}
      ref={ref}
    />
  );
}
);

Password.propTypes = {
  /** The name for the component. Your data will be returned by this key in the form onSubmit function. */
  name: PropTypes.string,
  /** The label that should be displayed at the top of the component. */
  label: PropTypes.string,
  /** Whether the input is disabled or not. */
  disabled: PropTypes.bool,
  /** Whether or not the input should be validated. */
  dontValidate: PropTypes.bool,
  /** Password is wrong. */
  wrongPassword: PropTypes.bool,
};

Password.defaultProps = {
  name: 'password',
  label: 'Password',
  disabled: false,
  dontValidate: false,
  wrongPassword: false,
};

export default Password;
