import * as yup from 'yup';

const HUNDRED = 100;
const BIG_NUMBER = 5000;

const deliveryDetailsValidate = yup.object().shape({
  adress: yup.string().required(' O campo endereço é obrigatório!')
    .max(HUNDRED, 'Endereço inválido!'),
  numberAdress: yup.number('Preencha o número do endereço apenas com números!')
    .required('O número do endereço é obrigatório!')
    .max(BIG_NUMBER, 'Número de endereço inválido!'),
});

export default deliveryDetailsValidate;
