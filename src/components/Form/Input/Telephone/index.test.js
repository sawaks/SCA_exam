import React from 'react';
import { Form } from 'react-final-form';
import { render, fireEvent, screen } from 'utilities/testing/redux-wrapper';
import Telephone from '.';
import '@testing-library/jest-dom';

describe('<Telephone /> Component', () => {
  beforeEach(() => {
    render(
      <Form onSubmit={jest.fn()}>
        {({ handleSubmit, invalid }) => (
          <form onSubmit={handleSubmit}>
            <Telephone />
            <div data-test="error">{invalid.toString()}</div>
          </form>
        )}
      </Form>
    );
  });

  test('it should accept valid values', () => {
    const input = screen.getByRole('textbox', { name: 'Phone number' });
    [
      '0412345678',
      '+61423456789',
    ].forEach((number) => {
      fireEvent.change(input, { target: { value: number } });
      expect(screen.getByTestId('error')).toHaveTextContent('false');
    });
  });

  test('it should reject invalid values', () => {
    const input = screen.getByRole('textbox', { name: 'Phone number' });
    [
      '412345678',
      '123456789',
      '1234567899',
    ].forEach((number) => {
      fireEvent.change(input, { target: { value: number } });
      expect(screen.getByTestId('error')).toHaveTextContent('true');
    });
  });
});
