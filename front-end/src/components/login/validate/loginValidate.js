import * as yup from 'yup';

const loginValidate = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export default loginValidate;
