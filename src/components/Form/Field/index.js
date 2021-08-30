import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Field as DefaultField } from 'react-final-form';
import { Flex } from '@rebass/grid';
import get from 'lodash/get';
import spacing from 'styles/helpers/spacing';
import CheckedIcon from 'components/Icons/checked.svg';
import ErrorIcon from 'components/Icons/error.svg';

function Field(props) {
  const { name, value, label, validate, helper, disabled, leftIcon, rightIcon, onRightIconClick, hideErrorIcon, children, wrongPassword } = props;
  const parse = get(props, 'parse');
  return (
    <DefaultField
      name={name}
      value={value}
      validate={validate}
      parse={parse}
    >
      {({ input, meta }) => {
        const showRightIcon = rightIcon;

        return (
          <FieldContainer disabled={disabled}>
            <InputContainer>
              { leftIcon && (<StyledIcon>{leftIcon}</StyledIcon>) }
              <Label
                {...meta}
                {...input}
                disabled={disabled}
                alignItems="center"
                hasIcon={leftIcon}
                wrongPassword={wrongPassword}
              >
                {label}
              </Label>
              {showRightIcon && (<StyledRightIcon onClick={onRightIconClick}>{rightIcon}</StyledRightIcon>) }
              <Flex>{children(input, meta)}</Flex>
              { !meta.error && input.value && !showRightIcon && !hideErrorIcon && <StyledCheckedIcon /> }
              { meta.touched && meta.error && !showRightIcon && !hideErrorIcon && <StyledErrorIcon /> }
            </InputContainer>
            <Helper {...meta}>
              {meta.touched && meta.error ? (meta.error) : helper}
              {(!meta.dirtySinceLastSubmit && !meta.submitting && meta.submitError) ? (meta.submitError) : ''}
            </Helper>
            <WrongPassword>
              {wrongPassword && !input.value ? 'Please try again or tap Forgot Password' : ''}
            </WrongPassword>
          </FieldContainer>
        );
      }}
    </DefaultField>
  );
}

const FieldContainer = styled.label`
  display: block;
  margin-bottom: ${spacing.m};
  width: 100%;

  ${props => props.disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
  `}
`;

const InputContainer = styled.div`
  position: relative;
`;

const FloatingCSS = css`
  top: -5px;
  left: -6px;
  height: 14px;
  background: ${props => props.theme.dark};
  padding: 0 ${spacing.s};
  font-size: 12px;
`;

const StyledCheckedIcon = styled(CheckedIcon)`
  position: absolute;
  top: 16px;
  right: 12px;
  width: 18px;
`;

const StyledErrorIcon = styled(ErrorIcon)`
  position: absolute;
  top: 16px;
  right: 12px;
  width: 18px;

  & path {
    fill: ${props => props.theme.formError};
  }
`;

const Label = styled(Flex)`
  position: absolute;
  pointer-events: none;
  margin-left: ${spacing.m};
  top: 0;
  left: ${props => (props.hasIcon ? '34px' : 0)};
  height: 100%;
  font-size: 16px;
  font-weight: normal;
  letter-spacing: normal;
  line-height: normal;
  transform-origin: top left;
  transition: height 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
  color: ${props => props.theme.light};
  opacity: 0.7;

  ${props => props.dirty && css`
    opacity: 1;
  `}

  ${props => props.active && css`
    opacity: 1;
    color: ${props.theme.formSuccess};
    ${FloatingCSS}
  `}

  ${props => (props.dirty || props.active || props.value) && FloatingCSS && css`
    color: ${props.theme.formSuccess};
    transform: scale(0.75);
    ${FloatingCSS}
  `}

  ${props => props.touched && props.error && FloatingCSS && css`
    color: ${props.theme.formError};
    opacity: 1;
    ${FloatingCSS}
  `}

  ${props => props.wrongPassword && !props.value && css`
    color: ${props.theme.formError};
    opacity: 1;
    ${FloatingCSS}
  `}

  &[disabled] {
    opacity: 0.6;
  }
`;

const Helper = styled.div`
  font-size: 12px;
  font-weight: normal;
  margin-top: ${spacing.s};
  margin-left: ${spacing.m};

  ${props => props.touched && (props.error || props.submitError) && css`
    color: ${props.theme.formError};
  `}
  ${props => props.touched && props.wrongPassword && css`
    color: ${props.theme.formError};
  `}
`;

const WrongPassword = styled.div`
  font-size: 12px;
  font-weight: normal;
  margin-top: ${spacing.s};
  margin-left: ${spacing.m};
  color: ${props => props.theme.formError};
`;

const StyledIcon = styled.div`
  position: absolute;
  top: 17px;
  left: 15px;
  width: 20px;
  height: 16px;
`;

const StyledRightIcon = styled.div`
  cursor: pointer;
  position: absolute;
  top: 17px;
  right: 14px;
  width: 20px;
  height: 16px;
`;

Field.propTypes = {
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  onRightIconClick: PropTypes.func,
  validate: PropTypes.func,
  helper: PropTypes.string,
  disabled: PropTypes.bool,
  hideErrorIcon: PropTypes.bool,
  wrongPassword: PropTypes.bool,
};

Field.defaultProps = {
  validate: null,
  leftIcon: null,
  rightIcon: null,
  onRightIconClick: () => {},
  helper: '',
  disabled: false,
  hideErrorIcon: false,
  wrongPassword: false,
};

export default Field;
