import React from 'react';
import { Form } from 'react-final-form';
import { render, fireEvent, screen } from 'utilities/testing/redux-wrapper';
import '@testing-library/jest-dom';
import Postcode from 'components/Form/Input/Postcode';

describe('<Postcode /> Component', () => {
  beforeEach(() => {
    render(
      <Form onSubmit={jest.fn()}>
        {({ handleSubmit, invalid }) => (
          <form onSubmit={handleSubmit}>
            <Postcode name="postcode" label="Postcode" />
            <div data-test="error">{invalid.toString()}</div>
          </form>
        )}
      </Form>
    );
  });

  test('it should accept valid values', () => {
    const input = screen.getByRole('textbox', { name: 'Postcode' });
    [
      '1234',
      '0000',
      '2011',
      '2000',
    ].forEach((code) => {
      fireEvent.change(input, { target: { value: code } });
      expect(screen.getByTestId('error')).toHaveTextContent('false');
    });
  });

  test('it should reject invalid values', () => {
    const input = screen.getByRole('textbox', { name: 'Postcode' });
    [
      '20 10',
      '20000',
      '200',
      'asdasd',
    ].forEach((code) => {
      fireEvent.change(input, { target: { value: code } });
      expect(screen.getByTestId('error')).toHaveTextContent('true');
    });
  });
});
