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
    const registerStub = sinon.stub(userService, 'register').resolves('Register');
    await userController.register(mockRequest, mockResponse);
    expect(registerStub.calledWith(mockRequest.body)).to.be.true;
    registerStub.restore();
  });
});

describe('Integration Test User Controller', () => {
  const validEmail = {
    name: 'Novo usuário',
    email: 'user@deliveryapp.com',
    password: 'user1234',
  };

  const invalidEmail = {
    name: 'Novo usuário',
    email: '123456',
    password: 'user1234',
  };

  const existingEmail = {
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: 'password',
  };

  it('should return status 201 and token', () => {
    chai.request(app)
      .post('/register')
      .send(validEmail)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.have.property(token);
      });
  });

  it('should return status 400 and invalid email error', () => {
    chai.request(app)
      .post('/register')
      .send(invalidEmail)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.not.have.property(token);
        expect(res.body.message).to.be.equal('email must be a valid email');
      });
  });

  it('should return status 422 and existing email error', () => {
    chai.request(app)
      .post('/register')
      .send(existingEmail)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(422);
        expect(res.body).to.not.have.property(token);
        expect(res.body.message).to.be.equal('E-mail already registered');
      });
  });
});
