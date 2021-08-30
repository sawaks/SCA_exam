import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Field from 'components/Form/Field';
import { StyledInput } from 'components/Form/Input';
import ArrowDown from 'components/Icons/arrow-down.svg';

const StyledDropdown = styled(StyledInput).attrs(() => ({
  as: 'select',
}))`
  appearance: none;
  overflow: hidden;

  &::-ms-expand {
    display: none;
  }

  &:-moz-focusring {
    color: #fff;
    text-shadow: 0 0 0 #000;
  }

  &:focus::-ms-value {
    background-color: transparent;
    color: inherit;
  }

  & option {
    color: #000;
  }
`;

const DropdownIcon = styled(ArrowDown)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
  width: 12px;
  height: auto;
  color: ${props => props.theme.light};
  transition: transform 0.1s ease;
  pointer-events: none;

  &[disabled] {
    color: ${props => props.theme.LEGACY_secondary};
    opacity: 0.2;
  }
`;

const Dropdown = forwardRef(({ name, label, value, helper, options, disabled, disableValidation, children, className, dataTest }, ref) => {
  const validate = (enteredValue) => {
    if (disableValidation) { return undefined; }
    // Check if a value exists
    if (!enteredValue) { return 'Please select a value'; }
    // Disable checking correct values if the children are supplied via props
    if (children) { return undefined; }
    // Check if the value matches any of the supplied options
    if ((Array.isArray(options) && options.includes(enteredValue))
      || Object.keys(options).includes(enteredValue)) {
      return undefined;
    }
    // If not, return an error
    return 'Please select a valid option';
  };

  return (
    <Field
      name={name}
      label={label}
      value={value}
      helper={helper}
      validate={validate}
      disabled={disabled}
      hideErrorIcon
    >
      {(input, meta) => (
        <>
          <StyledDropdown ref={ref} {...input} {...meta} disabled={disabled} className={className} data-test={dataTest}>
            <option disabled />
            {children || (Array.isArray(options)
              ? options.map(option => (
                <option value={option} key={option}>{option}</option>
              ))
              : Object.keys(options).map(key => (
                <option value={key} key={key}>{options[key]}</option>
              )))
            }
          </StyledDropdown>
          <DropdownIcon disabled={disabled} />
        </>
      )}
    </Field>
  );
}
);
Dropdown.propTypes = {
  /** The name for the component. Your data will be returned by this key in the form onSubmit function. */
  name: PropTypes.string.isRequired,
  /** The label that should be displayed at the top of the component. */
  label: PropTypes.string.isRequired,
  /** The default value to set for the component. */
  value: PropTypes.string,
  /** An optional helper text that appears at the bottom of the field. */
  helper: PropTypes.string,
  /** Either an object or array containing the options for the array. If it's an object it will return the key, while displaying the value.  */
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string.isRequired),
    PropTypes.objectOf(PropTypes.string.isRequired),
  ]),
  /** It's also possible to specify your options directly as children => <option value="value">Value</option> */
  children: PropTypes.node,
  /** Whether the input is disabled or not. */
  disabled: PropTypes.bool,
  /** Disable the automatic validation to do your own */
  disableValidation: PropTypes.bool,
  /** A classname to pass onto the input */
  className: PropTypes.string,
  /** The data label for Cypress testing */
  dataTest: PropTypes.string,
};

Dropdown.defaultProps = {
  value: '',
  helper: '',
  children: null,
  options: [],
  disabled: false,
  disableValidation: false,
  className: null,
  dataTest: '',
};

export default Dropdown;
