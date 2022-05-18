import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

function RegisterUserFormAdmin() {
  return (
    <>
      <h1>Cadastrar novo usuário</h1>

      <form>
        <label htmlFor="name">
          Nome
          <input type="text" name="name" />
        </label>
        <label htmlFor="email">
          Email
          <input type="text" name="email" />
        </label>
        <label htmlFor="password">
          Senha
          <input type="password" name="password" />
        </label>
        <label htmlFor="type-user">
          Tipo
          <select name="type-user">
            <option value="Vendedor">Vendedor</option>
            <option valeu="Cliente">Cliente</option>
          </select>
        </label>
        <button type="submit">CADASTRAR</button>
      </form>
    </>
  );
}

export default RegisterUserFormAdmin;
