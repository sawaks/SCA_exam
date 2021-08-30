import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Field from 'components/Form/Field';

export const StyledInput = styled.input`
  height: 50px;
  width: 100%;
  padding-left: ${props => (props.hasIcon ? '46px' : '12px')};
  padding-top: 16px;
  padding-bottom: 15px;
  font-size: 16px;
  font-weight: normal;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background-color: transparent;
  outline: 0;
  color: ${props => props.theme.light};


  ${props => props.active && css`
    border-width: 2px;
  `}

  ${props => props.active && !props.error && css`
    border-color: ${props.theme.formSuccess};
  `}

  ${props => props.active && props.error && css`
    border-width: 2px;
    border-color: ${props.theme.formError};
  `}

  ${props => props.wrongPassword && css`
    border-width: 2px;
    border-color: ${props.theme.formError};
  `}

  ${props => props.touched && props.error && css`
    border-color: ${props.theme.formError};
  `}

  ${props => props.value && props.modified && !props.error && css`
    border-color: ${props.theme.formSuccess};
  `}

  &[type=password] {
    -webkit-text-stroke-width: .1em;
    letter-spacing: 0.3em;
  }
`;

/**
 * This is the generic input. You can use it to render a text-based form field.
 *
 * @param {*} { name, label, type, value, helper, validate, children }
 */
const Input = forwardRef(({ name, label, type, value, helper, validate, disabled, leftIcon, rightIcon, onRightIconClick, children, wrongPassword, dataTest }, ref) => (
  <Field
    name={name}
    label={label}
    validate={validate}
    value={value}
    helper={helper}
    disabled={disabled}
    leftIcon={leftIcon}
    rightIcon={rightIcon}
    onRightIconClick={onRightIconClick}
    wrongPassword={wrongPassword}
  >
    {(input, meta) => (
      <>
        <StyledInput ref={ref} {...input} {...meta} type={type} disabled={disabled} hasIcon={leftIcon} wrongPassword={wrongPassword} data-test={dataTest} />
        {children}
      </>
    )}
  </Field>
)
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  helper: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  onRightIconClick: PropTypes.func,
  validate: PropTypes.func,
  disabled: PropTypes.bool,
  wrongPassword: PropTypes.bool,
  dataTest: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  value: '',
  helper: null,
  children: null,
  leftIcon: null,
  rightIcon: null,
  onRightIconClick: () => {},
  validate: null,
  disabled: false,
  wrongPassword: false,
  dataTest: '',
};

export default Input;
