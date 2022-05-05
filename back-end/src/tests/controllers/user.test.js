const sinon = require('sinon');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const userController = require('../../api/controllers/user')
const userService = require('../../api/services/user');
const app = require('../../api/app');

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
    status: sinon.stub().returns({ send: sinon.spy() })
  };

  it('should call userService login method', async () => {
    const loginStub = sinon.stub(userService, 'login').resolves('Login');
    await userController.login(mockRequest, mockResponse);
    expect(loginStub.calledWith(mockRequest.body)).to.be.true;
    loginStub.restore();
  });
}); 

describe('Integration Test Login', () => {

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
        expect(res.body).to.have.property('token');
      });
  });

  it('should return status 404 and message not found on incorrect body', () => {
    chai.request(app)
      .post('/login')
      .send(mockBodyIncorrect)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body).to.not.have.property('token');
        expect(res.body.message).to.be.equal('invalid email or password');
      });
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

describe('Integration Test Register', () => {
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

  it('should return status 201 and new user with token', () => {
    chai.request(app)
      .post('/register')
      .send(validEmail)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('role');
        expect(res.body).to.have.property('token');
      });
  });

  it('should return status 400 and invalid email error', () => {
    chai.request(app)
      .post('/register')
      .send(invalidEmail)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.not.have.property('name');
        expect(res.body).to.not.have.property('email');
        expect(res.body).to.not.have.property('role');
        expect(res.body).to.not.have.property('token');
        expect(res.body.message).to.be.equal('email must be a valid email');
      });
  });

  it('should return status 409 and existing email error', () => {
    chai.request(app)
      .post('/register')
      .send(existingEmail)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(409);
        expect(res.body).to.not.have.property('token');
        expect(res.body.message).to.be.equal('E-mail already registered');
      });
  });
});
