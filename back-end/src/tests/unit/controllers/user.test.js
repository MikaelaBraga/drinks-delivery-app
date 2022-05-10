const sinon = require('sinon');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const userController = require('../../../api/controllers/user');
const userService = require('../../../api/services/user');

chai.use(chaiHTTP);

const { expect } = chai;

describe('Unit Test Login', () => {

  const mockRequest = {
    body: {
      name: 'Delivery App Admin',
      email: 'adm@deliveryapp.com',
      password: '--adm2@21!!--',
    },
  };

  const mockResponse = {
    json: sinon.spy(),
    status: sinon.stub().returns({ send: sinon.spy() }),
  };

  it('should call userService login method', async () => {
    const loginStub = sinon.stub(userService, 'login').resolves('Login');
    await userController.login(mockRequest, mockResponse);
    expect(loginStub.calledWith(mockRequest.body)).to.be.true;
    loginStub.restore();
  });
}); 

describe('Unit Test Register', () => {
  const mockRequest = {
    body: {
      name: 'Novo usuário',
      email: 'user@deliveryapp.com',
      password: 'user1234',
    },
  };

  const mockResponse = {
    json: sinon.spy(),
    status: sinon.stub().returns({ send: sinon.spy() })
  };

  it('should call userService register method', async () => {
    const registerStub = sinon.stub(userService, 'registerCustomer').resolves('Register');
    await userController.registerCustomer(mockRequest, mockResponse);
    expect(registerStub.calledWith(mockRequest.body)).to.be.true;
    registerStub.restore();
  });
});

describe('Unit Test Get Sellers', () => {

  const mockRequest = {};

  const mockResponse = {
    json: sinon.spy(),
    status: sinon.stub().returns({ send: sinon.spy() })
  };

  it('should call userService getSellers method', async () => {
    const getSellersStub = sinon.stub(userService, 'getSellers').resolves('Sellers');
    await userController.getSellers(mockRequest, mockResponse);
    expect(getSellersStub.calledWith()).to.be.true;
    getSellersStub.restore();
  });

});


