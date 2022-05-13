import * as yup from 'yup';

const HUNDRED = 100;
const BIG_NUMBER = 5000;

const deliveryDetailsValidate = yup.object().shape({
  seller: yup.string().required('O vendedor precisa ser selecionado!'),
  adress: yup.string().required(' O campo endereço é obrigatório!')
    .max(HUNDRED, 'Endereço inválido!'),
  numberAdress: yup.number().required('O campo senha é obrigatório!')
    .max(BIG_NUMBER, 'Número de endereço inválido!'),
});

export default deliveryDetailsValidate;
