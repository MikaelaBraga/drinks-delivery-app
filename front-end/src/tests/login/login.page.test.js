import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';

test('checks if the email field is rendered', () => {
  render(<App />);
  const inputEmail = screen.getByLabelText('Email');

  expect(inputEmail).toBeInTheDocument();
  expect(inputEmail.type).toBe('email');
});

test('checks if the password input is rendered', () => {
  render(<App />);
  const inputPassword = screen.getByLabelText('Senha');

  expect(inputPassword).toBeInTheDocument();
  expect(inputPassword.type).toBe('email');
});

test('checks if the login button is rendered', () => {
  render(<App />);
});

test('checks if the register button is rendered', () => {
  render(<App />);
});
