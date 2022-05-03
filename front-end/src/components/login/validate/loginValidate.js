import * as yup from 'yup';

const FORTY = 40;
const THIRTYTWO = 32;
const SIX = 6;

const loginValidate = yup.object().shape({
  email: yup.string().email('Campo inválido!')
    .required(' O campo email é obrigatório!')
    .max(FORTY, 'Campo inválido.'),
  password: yup.string()
    .required('O campo senha é obrigatório!')
    .min(SIX, 'Campo inválido!')
    .max(THIRTYTWO, 'Campo inválido.'),
});

export default loginValidate;
