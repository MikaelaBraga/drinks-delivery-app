import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import registerUserValidate from './validate/registerUserValidate';

function RegisterUserFormAdmin() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerUserValidate),
    mode: 'onChange',
  });

  const onSubmit = (datas) => console.log(datas);

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
            <option value="Vendedor">Vendedor</option>
            <option valeu="Cliente">Cliente</option>
          </select>
        </label>
        <button
          type="submit"
          data-testid="admin_manage__button-register"
        >
          CADASTRAR
        </button>
        <strong>
          { errors.name?.message
          || errors.email?.message
          || errors.password?.message
          || errors.role?.message }
        </strong>
      </form>
    </>
  );
}

export default RegisterUserFormAdmin;
