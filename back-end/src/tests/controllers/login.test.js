const sinon = require('sinon');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const userController = require('../../controllers/user')
const userService = require('../../services/user');

chai.use(chaiHTTP);

const { expect } = chai;

describe('Test User Controller', () => {

  const mockRequest = {
    body: {
      name: 'Delivery App Admin',
      email: 'adm@deliveryapp.com',
      password: '--adm2@21!!--',
    },
  };

  const mockResponse = {
    json: sinon.spy(),
    status: sinon.stub().returns({ send: sinon.spy() })
  };

  it('should call userService login method', async () => {
    const loginStub = sinon.stub(userService, 'login').resolves('Login');
    await userController.login(mockRequest, mockResponse);
    expect(loginStub.calledWith(mockRequest.body)).to.be.true;
  });
})