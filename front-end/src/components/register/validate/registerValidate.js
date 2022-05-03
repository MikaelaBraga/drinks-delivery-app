import * as yup from 'yup';

const TWELVE = 12;
const SIX = 6;

const loginValidate = yup.object().shape({
  name: yup.string()
    .required(' O campo Nome é de preenchimento obrigatório!')
    .min(TWELVE, 'O campo Nome não é válido'),
  email: yup.string()
    .required(' O campo é de preenchimento obrigatório!')
    .email(/\S+@\S+\.\S+/,
      'O endereço usado no campo Email não é um endereço de email válido'),
  password: yup.string()
    .required('O campo senha é obrigatório!')
    .min(SIX, 'Sua senha deve ter no mínimo 6 caracteres'),
});

export default loginValidate;
