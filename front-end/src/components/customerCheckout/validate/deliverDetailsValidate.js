import * as yup from 'yup';

const HUNDRED = 100;

const BIG_NUMBER = 5000;

const deliveryDetailsValidate = yup.object().shape({
  seller: yup.object().shape({
    label: yup.string().required('O vendedor precisa ser selecionado!'),
    value: yup.string().required('O vendedor precisa ser selecionado!'),
  }),
  adress: yup.string().required(' O campo de endereço é obrigatório!')
    .max(HUNDRED, 'Campo de endereço inválido.'),
  adressNumber: yup.number()
    .required('O campo de número é obrigatório!')
    .max(BIG_NUMBER, 'Campo de número inválido.'),
});

export default deliveryDetailsValidate;
