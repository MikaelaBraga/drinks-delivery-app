import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';
import loginValidate from './validate/loginValidate';
import api from '../../services/api';

function Login() {
  const [invalidLogin, setInvalidLogin] = useState();
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    resolver: yupResolver(loginValidate),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit = (data) => api.post('/login', data)
    .then(() => navigate('/products'))
    .catch(({ response }) => setInvalidLogin(response.data));

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
        <p data-testid="common_login__element-invalid-email">{ invalidLogin?.message }</p>
      </div>
      <button
        data-testid="common_login__button-login"
        type="submit"
        disabled={ !isDirty || !isValid }
      >
        Login
      </button>

      <button
        onClick={ () => navigate('/register') }
        data-testid="common_login__button-register"
        type="button"
      >
        <Link to="/register">Ainda não tenho conta</Link>
      </button>

    </form>
  );
}

export default Login;
