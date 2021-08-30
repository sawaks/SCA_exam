import React from 'react';
import { Form } from 'react-final-form';
import Date from 'components/Form/Input/Date';
import { render, fireEvent, screen } from 'utilities/testing/redux-wrapper';
import '@testing-library/jest-dom';

describe('<Date /> Component', () => {
  beforeEach(() => {
    render(
      <Form onSubmit={jest.fn()}>
        {({ handleSubmit, invalid }) => (
          <form onSubmit={handleSubmit}>
            <Date />
            <div data-test="error">{invalid.toString()}</div>
          </form>
        )}
      </Form>
    );
  });

  test('it should accept valid values', () => {
    const input = screen.getByRole('textbox', { name: 'Date' });
    [
      '01/01/2000',
      '12/12/1200',
      '12/10/1999',
      '01/01/2001',
    ].forEach((date) => {
      fireEvent.change(input, { target: { value: date } });
      expect(screen.getByTestId('error')).toHaveTextContent('false');
    });
  });

  test('it should reject invalid values', () => {
    const input = screen.getByRole('textbox', { name: 'Date' });
    [
      '01/01/3000',
      '1-1-1',
      '01\\01\\01',
      '01 January 2001',
    ].forEach((date) => {
      fireEvent.change(input, { target: { value: date } });
      expect(screen.getByTestId('error')).toHaveTextContent('true');
    });
  });
});
