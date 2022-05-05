import React from 'react';
import { screen } from '@testing-library/react';
// import Register from '../components/register/RegisterForm';
import renderWithRouter from '../tests/helper/renderWithRouter'
import App from '../App';

it('deve renderizar o componente Register', () => {
  renderWithRouter(<App />, { route: '/register' })

  const inputName = screen.getByRole('textbox', { name: /name/i})
  expect(inputName).toBeInTheDocument();
});
