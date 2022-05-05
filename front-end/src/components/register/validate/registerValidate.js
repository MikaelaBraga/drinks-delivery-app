import * as yup from 'yup';

const TWELVE = 12;
const SIX = 6;

const registerValidate = yup.object().shape({
  name: yup.string()
    .required(' O campo Nome é de preenchimento obrigatório!')
    .min(TWELVE, 'O campo Nome deve ter mais de 12 caracteres'),
  email: yup.string()
    .required('O campo Email é de preenchimento obrigatório!')
    .email('O endereço usado no campo Email não é um endereço de email válido'),
  password: yup.string()
    .required('O campo Senha é de preenchimento obrigatório!')
    .min(SIX, 'Sua senha deve ter no mínimo 6 caracteres'),
});

export default registerValidate;
