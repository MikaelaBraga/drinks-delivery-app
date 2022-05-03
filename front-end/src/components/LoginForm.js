import React from 'react';
import { useForm } from 'react-hook-form';

// import api from '../services/api';

// formState: { errors }

function Login() {
  const { register, handleSubmit } = useForm();
  // useEffect(() => {
  //   api.post('/login').then(({ data }) => {
  //     setEmail(data);
  //     setPassword(data);
  //   });
  // }, []);

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <input
        data-testid="common_login_input-email"
        placeholder="Insira seu email"
        name="email"
        type="text"
        { ...register('email') }
      />
      <input
        data-testid="common_login_input-password"
        placeholder="Insira sua senha"
        name="password"
        type="password"
        { ...register('password') }
      />

      <button
        data-testid="common_login_button-login"
        type="submit"
      >
        Login
      </button>

      <button
        data-testid="common_login_button-register"
        type="button"
      >
        AINDA NÃO TENHO CONTA
      </button>

    </form>
  );
}

export default Login;
