import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Form/Input';

function validator(value) {
  if (!value) { return 'Please enter a postcode'; }
  if (!RegExp(/^[0-9]{4}$/).test(value)) { return 'Please enter a valid postcode'; }
  return undefined;
}

function Postcode({ name, label, disabled, dataTest }) {
  return (
    <Input
      name={name}
      label={label}
      validate={validator}
      disabled={disabled}
      dataTest={dataTest}
    />
  );
}

Postcode.propTypes = {
  /** The name for the component. Your data will be returned by this key in the form onSubmit function. */
  name: PropTypes.string,
  /** The label that should be displayed at the top of the component. */
  label: PropTypes.string,
  /** Whether the input is disabled or not. */
  disabled: PropTypes.bool,
  /** The data label for Cypress testing */
  dataTest: PropTypes.string,
};

Postcode.defaultProps = {
  name: 'postcode',
  label: 'Postcode',
  disabled: false,
  dataTest: '',
};

export default Postcode;
