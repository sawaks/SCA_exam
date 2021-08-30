import React from 'react';
import { Form } from 'react-final-form';
import Email from 'components/Form/Input/Email';
import Postcode from 'components/Form/Input/Postcode';
import Date from 'components/Form/Input/Date';
import Telephone from 'components/Form/Input/Telephone';
import Dropdown from 'components/Form/Dropdown';
import Checkbox from 'components/Form/Checkbox';
import Radio from 'components/Form/Radio';
import Button from 'components/Button';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('<Form /> Component', () => {
  const result = jest.fn();

  beforeEach(() => {
    render(
      <Form onSubmit={result}>
        {({ handleSubmit, submitting, invalid }) => (
          <form onSubmit={handleSubmit}>
            <Email />
            <Dropdown name="title" options={['Ms', 'Mr', 'Mrs']} label="Title" />
            <Postcode />
            <Telephone />
            <Date />
            <Checkbox name="checks" label="Checks" options={['Check 1', 'Check 2', 'Check 3']} />
            <Radio name="radio" label="Radio" options={['Radio 1', 'Radio 2', 'Radio 3']} />
            <Button type="submit" isProgress={submitting} disabled={invalid || submitting} text="Submit" />
          </form>
        )}
      </Form>
    );
  });

  test('the submit button should be disabled if the form is empty', () => {
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  test('the form should not be submitted if the form is empty', () => {
    fireEvent.click(screen.getByRole('button'));
    expect(result.mock.calls.length).toBe(0);
  });

  test('the submit button should be enabled after all data is passed in', () => {
    const email = screen.getByRole('textbox', { name: 'Email address' });
    const postcode = screen.getByRole('textbox', { name: 'Postcode' });
    const phone = screen.getByRole('textbox', { name: 'Phone number' });
    const title = screen.getByRole('combobox', { name: 'Title' });
    const date = screen.getByRole('textbox', { name: 'Date' });
    const checkOne = screen.getAllByRole('checkbox');
    const radioOne = screen.getAllByRole('radio');

    fireEvent.change(email, { target: { value: 'valid@email.com' } });
    fireEvent.change(title, { target: { value: 'Ms' } });
    fireEvent.change(postcode, { target: { value: '1234' } });
    fireEvent.change(phone, { target: { value: '0412345678' } });
    fireEvent.change(date, { target: { value: '12/12/2000' } });
    fireEvent.click(checkOne[0]);
    fireEvent.click(radioOne[0]);

    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
  });
});
