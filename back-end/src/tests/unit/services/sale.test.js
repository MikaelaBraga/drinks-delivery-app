// const saleService = require('../../../api/services/sale');
// const { Sale } = require('../../../database/models');
// const { SalesProducts } = require('../../../database/models');
// const sinon = require('sinon');
// const chai = require('chai');

// const { expect } = chai;

// describe('Unit Test Sale', () => {

//   const mockControllerNewSaleCall = {
//     userId: 1,
//     products: [{
//       productId: 1,
//       quantity: 1
//     }],
//     sellerId: 1,
//     totalPrice: 100,
//     deliveryAddress: 'Rua teste',
//     deliveryNumber: 123
//   };

//   const mockNewSale = {
//     ...mockControllerNewSaleCall,
//     saleDate: new Date(),
//     status: 'Pendente',
//   };

//   it('should call Sale model create by mockNewSale', async () => {
//     const userStub = sinon.stub(Sale, 'create').resolves(mockNewSale);
//     await saleService.post(mockControllerNewSaleCall);
//     expect(userStub.calledWith(mockNewSale)).to.be.true;
//     userStub.restore();
//   });
// });
