// refatorar código para usar no loginForm

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function useSendUser(datas) {
//   const navigate = useNavigate();

//   api.post('/login', datas)
//     .then(({ data }) => {
//       localStorage.setItem('user', JSON.stringify(data));
//       switch (data.role) {
//       case 'customer':
//         navigate('/customer/products');
//         break;
//       case 'seller':
//         navigate('/seller/orders');
//         break;
//       case 'administrator':
//         navigate('/admin/manage');
//         break;
//       default:
//         break;
//       }
//     })
//     .catch(({ response }) => setInvalidLogin(response.data));
// }

// export default useSendUser;
