import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';

test('checks if the email field is rendered', () => {
  render(<App />);
});

test('checks if the password input is rendered', () => {
  render(<App />);
});

test('checks if the login button is rendered', () => {
  render(<App />);
});

test('checks if the register button is rendered', () => {
  render(<App />);
});
