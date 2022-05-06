const sinon = require('sinon');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('../api/app');

chai.use(chaiHTTP);

const { expect } = chai;

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

describe('Integration Test Login', () => {

  const mockBodyCorrect = {
    email: 'adm@deliveryapp.com',
    password: '--adm2@21!!--',
  };

  const mockBodyIncorrect = {
    email: 'adm@deliveryapp.com',
    password: 'senhaerrada'
  }

  it('should return status 200 and token on correct body', () => {
    chai.request(app)
      .post('/login')
      .send(mockBodyCorrect)
      .end((err, res) => {
        tokenSession = res.body.token;
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

describe('Integration Test Products', () => {

  const customer = {
    email: "zebirita@email.com",
    password: "$#zebirita#$"
  }

  describe('Testing getAll integration', () => {

    let customerLogged = {};

    before(async () => {
      const { body } = await chai.request(app)
      .post('/login')
      .send(customer);
      customerLogged = body;
    });

    it('should return status 200 and products array', ()=> {
      chai.request(app)
      .get('/customer/products')
      .set('Authorization', customerLogged.token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
    });

    it('should return status 401 without token', ()=> {
      chai.request(app)
      .get('/customer/products')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.be.equal('Unauthorized, token not found');
      });
    });

  });

  describe('Testing getById integration', () => {

    let customerLogged = {};

    before(async () => {
      const { body } = await chai.request(app)
      .post('/login')
      .send(customer);
      customerLogged = body;
    });

    it('should return status 200 and founded product', ()=> {
      chai.request(app)
      .get('/customer/products/1')
      .set('Authorization', customerLogged.token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.all.keys('id', 'name', 'price', 'url_image');
      });
    });

    it('should return status 404 and not found', ()=> {
      chai.request(app)
      .get('/customer/products/99999999999999')
      .set('Authorization', customerLogged.token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body.message).to.be.equal('not found');
      });
    });

    describe('should return status 401 without token', ()=> {
      chai.request(app)
      .get('/customer/products/1')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.be.equal('Unauthorized, token not found');
      });
    });

  });

});

describe('Integration Test Order', () => {

  const customer = {
    email: "zebirita@email.com",
    password: "$#zebirita#$"
  }

  let tokenSession;

  const mockBodyOrderCorrect = {
    products: [{
      productId: 1,
      quantity: 1
    }],
    sellerId: 1,
    totalPrice: 100,
    deliveryAddress: 'Rua teste',
    deliveryNumber: 123
  };

  const mockBodyOrderIncorrect = {
    // products: [{
    //   productId: 1,
    //   quantity: 1
    // }],
    // missing products
    sellerId: 1,
    totalPrice: 100,
    deliveryAddress: 'Rua teste',
    deliveryNumber: 123
  };

  before(async () => {
    const { body } = await chai.request(app)
    .post('/login')
    .send(customer);
    tokenSession = body.token;
  });

  it('should return 201 and saleId on correct body', () => {
    chai.request(app)
    .post('/customer/order')
    .set('authorization', tokenSession)
    .send(mockBodyOrderCorrect)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('saleId');
    });
  });

  it('should return 400 on incorrect body', () => {
    chai.request(app)
    .post('/customer/order')
    .set('authorization', tokenSession)
    .send(mockBodyOrderIncorrect)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.body.message).to.be.equal('products is required');
    });
  });

  it('should return 401 without token', () => {
    chai.request(app)
    .post('/customer/order')
    .send(mockBodyOrderCorrect)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(401);
      expect(res.body.message).to.be.equal('Unauthorized, token not found');
    });
  })

})
