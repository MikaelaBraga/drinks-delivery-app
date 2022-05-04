import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import registerValidate from './validate/registerValidate';
import api from '../../services/api';

function Register() {
  // const [_isValid, _setIsValid] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerValidate),
    mode: 'onChange',
  });

  const onSubmit = (data) => api.post('/register', data)
    .then(() => console.log('Deu certo!'))
    .catch(() => console.log('Deu errado!'));

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
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
      <button
        data-testid="common_register__button-register"
        type="submit"
      >
        CADASTRAR
      </button>
    </form>
  );
}

export default Register;
