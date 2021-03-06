const sinon = require('sinon');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const saleController = require('../../../api/controllers/sale');
const saleService = require('../../../api/services/sale');

chai.use(chaiHTTP);

const { expect } = chai;

describe('Unit Test Sale', () => {

  const mockRequest = {
    body: { 
      products: [{
        productId: 1,
        quantity: 1
      }],
      sellerId: 1,
      totalPrice: 100,
      deliveryAddress: 'Rua teste',
      deliveryNumber: 123
    }
  };

  const mockResponse = {
    json: sinon.spy(),
    status: sinon.stub().returns({ send: sinon.spy() }),
    locals: sinon.stub().returns({ userId: 1 })
  };

  it('should call saleService post method with userId and body', async () => {
    const postStub = sinon.stub(saleService, 'post').resolves('Posted');
    await saleController.post(mockRequest, mockResponse);
    const { userId } = mockResponse.locals;
    const { body: sale } = mockRequest;
    expect(postStub.calledWith({ userId, ...sale })).to.be.true;
    postStub.restore();
  });

  it('should call saleService getSalesByUser method with userId', async () => {
    const getSalesByUserStub = sinon.stub(saleService, 'getSalesByUser').resolves('Sales');
    await saleController.getSalesByUser(mockRequest, mockResponse);
    const { userId } = mockResponse.locals;
    expect(getSalesByUserStub.calledWith(userId)).to.be.true;
    getSalesByUserStub.restore();
  });
});
