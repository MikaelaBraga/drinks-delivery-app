// import React from 'react';
// import { screen } from '@testing-library/react';
// import renderWithRouter from '../tests/helper/renderWithRouter'
// // import App from '../App';

// it('deve renderizar o componente Register', () => {
//   renderWithRouter(<Register />, { route: '/register' })

//   const inputName = screen.getByRole('textbox', { name: /name/i})
//   expect(inputName).toBeInTheDocument();
// });

// import * as React from "react";
// import { create } from "react-test-renderer";
// import {
//   MemoryRouter,
//   Routes,
//   Route,
// } from "react-router-dom";
// import Register from '../components/register/RegisterForm';

// it('testing register', () => {
//   let renderer = create(
//     <MemoryRouter initialEntries={["/register"]}>
//       <Routes>
//         <Route path="register" element={<Register />}>
//         </Route>
//       </Routes>
//     </MemoryRouter>
//   );

//   expect(renderer.toJSON()).toMatchSnapshot();
// })
