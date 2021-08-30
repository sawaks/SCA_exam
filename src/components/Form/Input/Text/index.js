import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Input from 'components/Form/Input';

const Text = forwardRef(({ name, label, disabled, dataTest }, ref) => {
  const validator = value => (value ? undefined : `Your ${label} is required`);
  return (
    <Input
      name={name}
      label={label}
      validate={validator}
      disabled={disabled}
      dataTest={dataTest}
      ref={ref}
    />
  );
}
);

Text.propTypes = {
  /** The name for the component. Your data will be returned by this key in the form onSubmit function. */
  name: PropTypes.string,
  /** The label that should be displayed at the top of the component. */
  label: PropTypes.string,
  /** Whether the input is disabled or not. */
  disabled: PropTypes.bool,
  /** The data label for Cypress testing */
  dataTest: PropTypes.string,
};

Text.defaultProps = {
  name: 'text',
  label: 'text',
  disabled: false,
  dataTest: '',
};

export default Text;
