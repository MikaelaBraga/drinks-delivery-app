import * as yup from 'yup';

const FORTY = 40;
const THIRTYTWO = 32;

const loginValidate = yup.object().shape({
  email: yup.string()
    .required(' O campo email é obrigatório!')
    .max(FORTY, 'Campo inválido!'),
  password: yup.string()
    .required('O campo senha é obrigatório!')
    .max(THIRTYTWO, 'Campo inválido!'),
});

export default loginValidate;
