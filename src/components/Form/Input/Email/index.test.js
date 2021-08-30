import React from 'react';
import { Form } from 'react-final-form';
import Email from 'components/Form/Input/Email';
import { render, fireEvent, screen } from 'utilities/testing/redux-wrapper';
import '@testing-library/jest-dom';

describe('<Email /> Component', () => {
  beforeEach(() => {
    render(
      <Form onSubmit={jest.fn()}>
        {({ handleSubmit, invalid }) => (
          <form onSubmit={handleSubmit}>
            <Email />
            <div data-test="error">{invalid.toString()}</div>
          </form>
        )}
      </Form>
    );
  });

  test('it should accept valid values', () => {
    const input = screen.getByRole('textbox', { name: 'Email address' });
    [
      'valid@email.com',
      'valid@email.com.au',
      'valid@email.dev',
    ].forEach((email) => {
      fireEvent.change(input, { target: { value: email } });
      expect(screen.getByTestId('error')).toHaveTextContent('false');
    });
  });

  test('it should reject invalid values', () => {
    const input = screen.getByRole('textbox', { name: 'Email address' });
    [
      'invalid@email',
      'invalid',
      'invalid@email.nonexistenttld.u',
    ].forEach((email) => {
      fireEvent.change(input, { target: { value: email } });
      expect(screen.getByTestId('error')).toHaveTextContent('true');
    });
  });
});
