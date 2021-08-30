import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';
import Input from 'components/Form/Input';
import EmailIcon from 'components/Icons/email.svg';
import styled from 'styled-components';

function validator(value) {
  let error = '';

  if (!value) {
    error = 'Please enter an email address';
  } else if (value && !isEmail(value)) {
    error = 'The email address is invalid';
  }

  return error;
}

const StyledEmailIcon = styled.div`
  width: 20px;
  height: 20px;
`;

const Email = forwardRef(({ name, label, disabled }, ref) => {
  const Icon = <StyledEmailIcon><EmailIcon /></StyledEmailIcon>;
  return (
    <>
      <Input
        name={name}
        label={label}
        validate={validator}
        disabled={disabled}
        leftIcon={Icon}
        ref={ref}
      />
    </>
  );
}
);

Email.propTypes = {
  /** The name for the component. Your data will be returned by this key in the form onSubmit function. */
  name: PropTypes.string,
  /** The label that should be displayed at the top of the component. */
  label: PropTypes.string,
  /** Whether the input is disabled or not. */
  disabled: PropTypes.bool,
};

Email.defaultProps = {
  name: 'email',
  label: 'Email address',
  disabled: false,
};

export default Email;
