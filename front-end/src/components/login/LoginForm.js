import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginValidate from './validate/loginValidate';
import api from '../../services/api';

function Login() {
  const [invalidLogin, setInvalidLogin] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginValidate),
  });

  const onSubmit = (data) => api.post('/login', data)
    .then(() => console.log('Deu certo!'))
    .catch((err) => setInvalidLogin(err.response));

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <div>
        <input
          data-testid="common_login__input-email"
          placeholder="Insira seu email"
          name="email"
          type="text"
          { ...register('email') }
        />
        <p>{ errors.email?.message }</p>
      </div>
      <div>
        <input
          data-testid="common_login__input-password"
          placeholder="Insira sua senha"
          name="password"
          type="password"
          { ...register('password') }
        />
        <p>{ errors.password?.message }</p>
      </div>
      <div>
        <p>{ invalidLogin?.statusText }</p>
      </div>
      <button
        data-testid="common_login__button-login"
        type="submit"
      >
        Login
      </button>

      <button
        data-testid="common_login__button-register"
        type="button"
      >
        AINDA NÃO TENHO CONTA
      </button>

    </form>
  );
}

export default Login;
