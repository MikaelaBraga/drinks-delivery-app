const sinon = require('sinon');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const userController = require('../../controllers/user')
const userService = require('../../services/user');
const app = require('../../api/app');

chai.use(chaiHTTP);

const { expect } = chai;

describe('Unit Test User Controller', () => {

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
    loginStub.restore();
  });
}) 

describe('Integration Test User Controller', () => {

  const mockBodyCorrect = {
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: '--adm2@21!!--',
  };

  const mockBodyIncorrect = {
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: 'senhaerrada'
  }

  it('should return status 200 and token on correct body', () => {
    chai.request(app)
      .post('/login')
      .send(mockBodyCorrect)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property(token);
      });
  });

  it('should return status 404 and message not found on incorrect body', () => {
    chai.request(app)
      .post('/login')
      .send(mockBodyIncorrect)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body).to.not.have.property(token);
      });
  });
})