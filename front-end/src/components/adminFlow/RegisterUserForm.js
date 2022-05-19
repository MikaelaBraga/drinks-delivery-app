import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import registerUserValidate from './validate/registerUserValidate';
import api from '../../services/api';

function RegisterUserFormAdmin() {
  const [userAlreadyExists, setUserAlreadyExists] = useState();
  const { token } = JSON.parse(localStorage.getItem('user'));
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    resolver: yupResolver(registerUserValidate),
    mode: 'onChange',
  });

  const onSubmit = (datas) => api.post('admin/register', datas,
    { headers: { Authorization: token } })
    .then(({ data }) => console.log(data))
    .catch(({ response }) => {
      if (response.statusText === 'Conflict') {
        setUserAlreadyExists(response.data);
      }
    });

  return (
    <>
      <h1>Cadastrar novo usuário</h1>

      <form onSubmit={ handleSubmit(onSubmit) }>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            name="name"
            data-testid="admin_manage__input-name"
            { ...register('name') }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            data-testid="admin_manage__input-email"
            { ...register('email') }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            name="password"
            data-testid="admin_manage__input-password"
            { ...register('password') }
          />
        </label>
        <label htmlFor="role">
          Tipo
          <select
            name="role"
            data-testid="admin_manage__select-role"
            { ...register('role') }
          >
            <option selected value="Vendedor">Vendedor</option>
            <option valeu="Cliente">Cliente</option>
          </select>
        </label>
        <button
          type="submit"
          data-testid="admin_manage__button-register"
          disabled={ !isDirty || !isValid }
        >
          CADASTRAR
        </button>
        <strong>
          { errors.name?.message
          || errors.email?.message
          || errors.password?.message
          || errors.role?.message }
        </strong>
        <strong>{ userAlreadyExists?.message }</strong>
      </form>
    </>
  );
}

export default RegisterUserFormAdmin;
