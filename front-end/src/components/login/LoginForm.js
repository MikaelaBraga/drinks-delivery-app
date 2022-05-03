import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import loginValidate from './validate/loginValidate';
import api from '../../services/api';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginValidate),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => api.post('/login', data)
    .then(() => console.log('Deu certo!'))
    .catch(() => console.log('Deu errado!'));

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
      <button
        data-testid="common_login__button-login"
        type="submit"
      >
        Login
      </button>

      <button
        onClick={ () => navigate('/register') }
        data-testid="common_login__button-register"
        type="button"
      >
        AINDA NÃO TENHO CONTA
      </button>

    </form>
  );
}

export default Login;
