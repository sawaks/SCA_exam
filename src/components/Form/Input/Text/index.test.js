import React from 'react';
import { Form } from 'react-final-form';
import { render, fireEvent, screen } from 'utilities/testing/redux-wrapper';
import Text from '.';
import '@testing-library/jest-dom';

describe('<Text /> Component', () => {
  beforeEach(() => {
    render(
      <Form onSubmit={jest.fn()}>
        {({ handleSubmit, invalid }) => (
          <form onSubmit={handleSubmit}>
            <Text />
            <div data-test="error">{invalid.toString()}</div>
          </form>
        )}
      </Form>
    );
  });

  test('it should accept valid values', () => {
    const input = screen.getByRole('textbox', { name: 'text' });
    [
      'asasas',
      'assasa',
    ].forEach((text) => {
      fireEvent.change(input, { target: { value: text } });
      expect(screen.getByTestId('error')).toHaveTextContent('false');
    });
  });

  test('it should reject invalid values', () => {
    const input = screen.getByRole('textbox', { name: 'text' });
    [
      '',
      null,
    ].forEach((text) => {
      fireEvent.change(input, { target: { value: text } });
      expect(screen.getByTestId('error')).toHaveTextContent('true');
    });
  });
});
