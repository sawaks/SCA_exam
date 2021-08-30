import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Field } from 'react-final-form';
import { Flex } from '@rebass/grid';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import spacing from 'styles/helpers/spacing';
import rgba from 'styles/helpers/rgba';

const Wrapper = styled.label`
  display: flex;
  flex: 0 1 120px;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Input = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
`;

const Checkmark = styled(Flex)`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  border: 2px solid ${props => rgba(props.theme.LEGACY_secondary, 0.6)};
  flex: 0 0 auto;
  margin-right: ${spacing.m};
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.whiteColor};
  overflow: hidden;

  & > * {
    opacity: 0;
    transform: scale(0.1);
    transition: opacity 0.1s ease, transform 0.15s ease;
  }

  ${props => props.checked && css`
    & > * {
      opacity: 1;
      transform: scale(1);
    }
  `}
`;

const CheckmarkDot = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.LEGACY_validationActive};
  border-radius: 100px;
  border: 1px solid ${props => props.theme.whiteColor};
`;

function RadioIndividual({ name, label, value, disabled }) {
  return (
    <Wrapper disabled={disabled}>
      <Field
        name={name}
        value={value}
        type="radio"
      >
        {({ input }) => (
          <>
            <Input type="radio" {...input} disabled={disabled} />
            <Checkmark checked={input.checked}><CheckmarkDot /></Checkmark>
            <Paragraph as="span" transparent={!input.checked}>{label}</Paragraph>
          </>
        )}
      </Field>
    </Wrapper>
  );
}

RadioIndividual.propTypes = {
  /** The name for the component. Your data will be returned by this key in the form onSubmit function. */
  name: PropTypes.string.isRequired,
  /** The label that should be displayed at the top of the component. */
  label: PropTypes.string.isRequired,
  /** The default value to set for the component. */
  value: PropTypes.string,
  /** Whether the input is disabled or not. */
  disabled: PropTypes.bool,
};

RadioIndividual.defaultProps = {
  value: '',
  disabled: false,
};

/**
 * This is a helper to convert values to radio components.
 */
function Radio({ name, label, options, disabled }) {
  return (
    <>
      <Header as="h5" marginBottom="m" text={label} />
      <Flex style={{ marginBottom: spacing.l }}>
        { Array.isArray(options)
          ? options.map(option => <RadioIndividual name={name} label={option} value={option} key={option} disabled={disabled} />)
          : Object.keys(options).map(key => <RadioIndividual name={name} label={options[key]} value={key} key={key} disabled={disabled} />)
        }
      </Flex>
    </>
  );
}

Radio.propTypes = {
  /** The name for the component. Your data will be returned by this key in the form onSubmit function. */
  name: PropTypes.string.isRequired,
  /** The label that should be displayed at the top of the component. */
  label: PropTypes.string.isRequired,
  /** Either an object or array containing the options for the array. If it's an object it will return the key, while displaying the value.  */
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string.isRequired),
    PropTypes.objectOf(PropTypes.string.isRequired),
  ]).isRequired,
  /** Whether the input is disabled or not. */
  disabled: PropTypes.bool,
};

Radio.defaultProps = {
  disabled: false,
};

export default Radio;
