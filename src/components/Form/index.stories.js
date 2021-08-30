import { Box } from 'components/Grid';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { Form } from 'react-final-form';
import EmailIcon from 'components/Icons/email.svg';
import HidePasswordIcon from 'components/Icons/hide-password.svg';
import Input from './Input';
import EmailInput from './Input/Email';
import PasswordInput from './Input/Password';
import DropdownInput from './Dropdown';
import CheckboxInput from './Checkbox';

export default {
  component: Input,
  title: 'Input Fields',
  parameters: {
    componentSubtitle: 'This in an example',
  },
  decorators: [withKnobs],
};

export const Default = () => {
  const invalid = boolean('Validation Error', false);
  const error = text('Error Message', 'Error message');

  const validator = () => invalid && error;

  return (
    <Box width={355} mt={24}>
      <Form onSubmit={() => {}}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Input
              name="First name"
              label={text('Label', 'First name')}
              disabled={boolean('Disable', false)}
              validate={validator}
              leftIcon={boolean('Left icon', false) ? <EmailIcon /> : null}
              rightIcon={boolean('Right icon', false) ? <HidePasswordIcon /> : null}
            />
          </form>
        )}
      </Form>
    </Box>
  );
};

export const Email = () => (
  <Box width={355} mt={24}>
    <Form onSubmit={() => {}}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <EmailInput disabled={boolean('Disable', false)} />
        </form>
      )}
    </Form>
  </Box>
);

export const Password = () => (
  <Box width={355} mt={24}>
    <Form onSubmit={() => {}}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <PasswordInput disabled={boolean('Disable', false)} />
        </form>
      )}
    </Form>
  </Box>
);

export const Checkbox = () => (
  <Box width={355} mt={24}>
    <Form onSubmit={() => {}}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <CheckboxInput
            name="gender"
            label=""
            options={{
              male: 'Explanation text to explain something that can go onto multiple lines.',
            }}
          />
        </form>
      )}
    </Form>
  </Box>
);

export const Dropdown = () => (
  <Box width={355} mt={24}>
    <Form onSubmit={() => {}}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <DropdownInput
            name="gender"
            label="Gender"
            options={{
              Male: 'Male',
              Female: 'Female',
              Other: 'Prefer not to say',
            }}
          />
        </form>
      )}
    </Form>
  </Box>
);
