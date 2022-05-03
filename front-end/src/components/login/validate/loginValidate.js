import * as yup from 'yup';

const loginValidate = yup.object().shape({
  email: yup.string().required(' O campo email é obrigatório!'),
  password: yup.string().required('O campo senha é obrigatório!'),
});

export default loginValidate;
