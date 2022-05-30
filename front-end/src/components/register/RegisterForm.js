import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import registerValidate from './validate/registerValidate';
import api from '../../services/api';
import deliveryDrinksLogo from '../../images/drinksDelivery.png';
import './register.css';

function Register() {
  const [invalidRegister, setInvalidRegister] = useState();
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    resolver: yupResolver(registerValidate),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit = (data) => api.post('/register', data)
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/customer/products');
    })
    .catch(({ response }) => setInvalidRegister(response.data));

  return (
    <div className="container-register">

      <img src={ deliveryDrinksLogo } alt="logo delivery drinks" />
      <h1>Registre-se</h1>

      <form className="form-register" onSubmit={ handleSubmit(onSubmit) }>
        <div>
          <label htmlFor="name">
            Nome
            <input
              data-testid="common_register__input-name"
              placeholder="Seu nome"
              id="name"
              name="name"
              type="text"
              { ...register('name') }
            />
            <p>
              { errors.name?.message }
            </p>
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Email
            <input
              data-testid="common_register__input-email"
              placeholder="seu-email@site.com.br"
              id="email"
              name="email"
              type="text"
              { ...register('email') }
            />
            <p>
              { errors.email?.message }
            </p>
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Senha
            <input
              data-testid="common_register__input-password"
              placeholder="**********"
              id="password"
              name="password"
              type="password"
              { ...register('password') }
            />
            <p>
              { errors.password?.message }
            </p>
          </label>
        </div>
        <p
          className="invalid-register"
          data-testid="common_register__element-invalid_register"
        >
          { invalidRegister?.message }
        </p>
        <button
          data-testid="common_register__button-register"
          type="submit"
          disabled={ !isDirty || !isValid }
        >
          CADASTRAR
        </button>
      </form>

    </div>
  );
}

export default Register;
