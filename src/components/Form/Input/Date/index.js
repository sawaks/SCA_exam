import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import Field from 'components/Form/Field';
import { StyledInput } from 'components/Form/Input';
import formatString from 'format-string-by-pattern';
import { calculateAge } from 'utilities/helpers/dateTime';

// eslint-disable-next-line max-len
const DateRegex = RegExp(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/);
const DateMask = styled(Flex)`
  position: absolute;
  left: 0;
  top: 0;
  padding-top: 16px;
  padding-bottom: 15px;
  padding-left: 12px;
  height: 100%;
  font-size: 16px;
  letter-spacing: 0.01em;
  opacity: 0.6;
`;

const Invisible = styled.span`
  visibility: hidden;
`;

function validator(value) {
  if (!value) { return 'Please enter a date'; }
  if (!DateRegex.test(value)) { return 'Please enter a valid date in the DD/MM/YYYY format'; }
  if (calculateAge(value) < 13) { return 'Minimum age is 13 years old'; }
  return undefined;
}

const mask = 'DD/MM/YYYY';

function Date({ name, label, disabled, dataTest }) {
  return (
    <Field
      name={name}
      label={label}
      validate={validator}
      value=""
      disabled={disabled}
      parse={formatString(mask)}
    >
      {(input, meta) => (
        <>
          <StyledInput type="text" {...input} {...meta} disabled={disabled} maxLength={10} data-test={dataTest} />
          <DateMask alignItems="center" indent={input.value.length}>
            {(meta.active || meta.dirty) && (
              <>
                <Invisible>{input.value}</Invisible>
                <span>{mask.slice(input.value.length)}</span>
              </>
            )}
          </DateMask>
        </>
      )}
    </Field>
  );
}

Date.propTypes = {
  /** The name for the component. Your data will be returned by this key in the form onSubmit function. */
  name: PropTypes.string,
  /** The label that should be displayed at the top of the component. */
  label: PropTypes.string,
  /** Whether the input is disabled or not. */
  disabled: PropTypes.bool,
  /** The data label for Cypress testing */
  dataTest: PropTypes.string,
};

Date.defaultProps = {
  name: 'date',
  label: 'Date',
  disabled: false,
  dataTest: '',
};

export default Date;
