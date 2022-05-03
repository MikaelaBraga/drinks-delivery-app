import * as yup from 'yup';

const loginValidate = yup.object().shape({
  email: yup.string()
    // eslint-disable-next-line no-magic-numbers
    .required(' O campo email é obrigatório!').max(40, 'Campo inválido!'),
  password: yup.string()
    // eslint-disable-next-line no-magic-numbers
    .required('O campo senha é obrigatório!').max(32, 'Campo inválido!'),
});

export default loginValidate;
