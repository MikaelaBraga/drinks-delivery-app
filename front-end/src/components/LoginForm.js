import React, { useState } from 'react';

// import api from '../services/api';

function Login() {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  // useEffect(() => {
  //   api.post('/login').then(({ data }) => {
  //     setEmail(data);
  //     setPassword(data);
  //   });
  // }, []);

  // fazer validação de inputs

  return (
    <form>
      <input
        data-testid="common_login_input-email"
        placeholder="Insira seu email"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
        name="email"
      />
      <input
        data-testid="common_login_input-password"
        placeholder="Insira sua senha"
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
        name="password"
        type="password"
      />

      <button
        data-testid="common_login_button-login"
        type="button"
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
