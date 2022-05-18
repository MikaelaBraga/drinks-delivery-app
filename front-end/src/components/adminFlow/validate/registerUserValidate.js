import * as yup from 'yup';

const SIX = 6;
const TWELVE = 12;

const registerUserValidate = yup.object().shape({
  name: yup.string().min(TWELVE, 'O nome deve ter no mínimo 12 caractéres!')
    .required('O campo nome é obrigatório!'),
  email: yup.string().email().required(''),
  password: yup.string().min(SIX, 'A senha deve ter no mínimo 6 caractéres!')
    .required('O campo senha é obrigatório!'),
  role: yup.string().required('O tipo de usuário deve ser selecionado!'),
});

export default registerUserValidate;
