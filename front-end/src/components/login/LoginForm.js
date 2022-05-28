import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';
import loginValidate from './validate/loginValidate';
import api from '../../services/api';
import deliveryDrinksLogo from '../../images/drinksDelivery.png';
import './login.css';

function Login() {
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    resolver: yupResolver(loginValidate),
    mode: 'onChange',
  });

  const [invalidLogin, setInvalidLogin] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem('user'));

    if (getUser && getUser.role === 'customer') {
      navigate('/customer/products');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (datas) => api.post('/login', datas)
    .then(({ data }) => {
      localStorage.setItem('user', JSON.stringify(data));
      switch (data.role) {
      case 'customer':
        navigate('/customer/products');
        break;
      case 'seller':
        navigate('/seller/orders');
        break;
      case 'administrator':
        navigate('/admin/manage');
        break;
      default:
        break;
      }
    })
    .catch(({ response }) => setInvalidLogin(response.data));

  return (
    <div className="container-login">

      <img src={ deliveryDrinksLogo } alt="logo delivery drinks" />
      <h1 className="title-login">Login</h1>

      <form className="form-login" onSubmit={ handleSubmit(onSubmit) }>
        <div>
          <label htmlFor="email">
            Email
            <input
              data-testid="common_login__input-email"
              placeholder="Insira seu email"
              name="email"
              type="email"
              { ...register('email') }
            />
          </label>
          <p>{ errors.email?.message }</p>
        </div>
        <div>
          <label htmlFor="password">
            Senha
            <input
              data-testid="common_login__input-password"
              placeholder="Insira sua senha"
              name="password"
              type="password"
              { ...register('password') }
            />
          </label>
          <p>{ errors.password?.message }</p>
        </div>
        <div>
          <p
            data-testid="common_login__element-invalid-email"
          >
            { invalidLogin?.message }
          </p>
        </div>
        <button
          className="button-login"
          data-testid="common_login__button-login"
          type="submit"
          disabled={ !isDirty || !isValid }
        >
          Login
        </button>

        <button
          className="button-register"
          onClick={ () => navigate('/register') }
          data-testid="common_login__button-register"
          type="button"
        >
          <Link to="/register">Ainda não tenho conta</Link>
        </button>

      </form>
    </div>
  );
}

export default Login;
