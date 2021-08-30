import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Field } from 'react-final-form';
import { Flex } from '@rebass/grid';
import Header from 'components/Typography/Header';
import Paragraph from 'components/Typography/Paragraph';
import CheckIcon from 'components/Icons/checked.svg';
import spacing from 'styles/helpers/spacing';
import rgba from 'styles/helpers/rgba';

const Wrapper = styled.label`
  display: flex;
  flex: 0 1 auto;
  min-width: 120px;
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
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid ${props => rgba(props.theme.light, 0.3)};
  flex: 0 0 auto;
  margin-right: ${spacing.m};
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.whiteColor};
  transition: background-color 0.1s ease;

  & > * {
    opacity: 0;
    transform: scale(0.1) translateY(-10px);
    transition: opacity 0.1s ease, transform 0.15s ease;
  }

  ${props => props.checked && css`
    & > * {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  `}
`;

const EmailLink = styled.span`
  font-weight: 600;
`;

function CheckboxIndividual({ name, label, value, disabled, sendEmail, ...props }) {
  return (
    <Wrapper disabled={disabled}>
      <Field
        name={name}
        value={value}
        type="checkbox"
        disabled={disabled}
        {...props}
      >
        {({ input }) => (
          <>
            <Input type="checkbox" {...input} disabled={disabled} />
            <Checkmark checked={input.checked} disabled={disabled}><CheckIcon /></Checkmark>
            <Paragraph as="span" transparent={!input.checked} lineHeight={1.29}>
              {label}
              {sendEmail && ' Send to: '}
              {sendEmail && <EmailLink>{sendEmail}</EmailLink>}
            </Paragraph>
          </>
        )}
      </Field>
    </Wrapper>
  );
}

CheckboxIndividual.propTypes = {
  /** The name for the component. Your data will be returned by this key in the form onSubmit function. */
  name: PropTypes.string.isRequired,
  /** The label that should be displayed at the top of the component. */
  label: PropTypes.string.isRequired,
  /** The default value to set for the component. */
  value: PropTypes.string,
  /** Whether the input is disabled or not. */
  disabled: PropTypes.bool,
  sendEmail: PropTypes.string.isRequired,
};

CheckboxIndividual.defaultProps = {
  value: undefined,
  disabled: false,
};

/**
 * This is a helper to convert values to checkbox components.
 */
function Checkbox({ name, label, description, options, disabled, sendEmail }) {
  return (
    <>
      {label && <Header as="h5" marginBottom="m" text={label} />}
      {description && <Paragraph marginBottom="m" transparent>{description}</Paragraph>}
      <Flex style={{ marginBottom: spacing.l }} flexWrap="wrap">
        { Array.isArray(options)
          ? options.map(option => <CheckboxIndividual name={name} label={option} value={options.length > 1 ? option : undefined} key={option} disabled={disabled} sendEmail={sendEmail} />)
          : Object.keys(options).map(key => <CheckboxIndividual name={name} label={options[key]} value={key} key={key} disabled={disabled} sendEmail={sendEmail} />)
        }
      </Flex>
    </>
  );
}

Checkbox.propTypes = {
  /** The name for the component. Your data will be returned by this key in the form onSubmit function. */
  name: PropTypes.string.isRequired,
  /** The label that should be displayed at the top of the component. */
  label: PropTypes.string.isRequired,
  /** An optional description that will be displayed between the label and checkbox */
  description: PropTypes.string,
  /** Either an object or array containing the options for the array. If it's an object it will return the key, while displaying the value.  */
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string.isRequired),
    PropTypes.objectOf(PropTypes.string.isRequired),
  ]).isRequired,
  /** Whether the input is disabled or not. */
  disabled: PropTypes.bool,
  sendEmail: PropTypes.string.isRequired,
};

Checkbox.defaultProps = {
  disabled: false,
  description: null,
};

export default Checkbox;
