const sinon = require('sinon');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('../api/app');

chai.use(chaiHTTP);

const { expect } = chai;

describe('Integration Test POST /register', () => {

  const path = '/register';

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
      .post(path)
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
      .post(path)
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
      .post(path)
      .send(existingEmail)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(409);
        expect(res.body).to.not.have.property('token');
        expect(res.body.message).to.be.equal('E-mail already registered');
      });
  });
});

describe('Integration Test POST /login', () => {

  const path = '/login';

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
      .post(path)
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
      .post(path)
      .send(mockBodyIncorrect)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body).to.not.have.property('token');
        expect(res.body.message).to.be.equal('invalid email or password');
      });
  });
});

describe('Integration Test GET /customer/products', () => {

  const path = '/customer/products';

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
      .get(path)
      .set('Authorization', customerLogged.token)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
    });

    it('should return status 401 without token', ()=> {
      chai.request(app)
      .get(path)
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

    it('should return status 401 without token', ()=> {
      chai.request(app)
      .get('/customer/products/1')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.be.equal('Unauthorized, token not found');
      });
    });

  });

});

describe('Integration Test POST /customer/order', () => {

  const path = '/customer/order';

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
    .post(path)
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
    .post(path)
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
    .post(path)
    .send(mockBodyOrderCorrect)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(401);
      expect(res.body.message).to.be.equal('Unauthorized, token not found');
    });
  });

});

describe('Integration Test GET /customer/sellers', () => {

  const path = '/customer/sellers';

  const customer = {
    email: "zebirita@email.com",
    password: "$#zebirita#$"
  }

  let tokenSession;

  before(async () => {
    const { body } = await chai.request(app)
    .post('/login')
    .send(customer);
    tokenSession = body.token;
  });

  it('should return 200 and array of sellers', () => {
    chai.request(app)
    .get(path)
    .set('authorization', tokenSession)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.not.be.undefined;
    });
  });

  it('should return 401 without token', () => {
    chai.request(app)
    .get(path)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(401);
      expect(res.body.message).to.be.equal('Unauthorized, token not found');
    });
  })

});

describe('Integration Test GET /customer/orders', () => {

  const path = '/customer/orders';

  const customer = {
    email: "zebirita@email.com",
    password: "$#zebirita#$"
  }

  let tokenSession;

  before(async () => {
    const { body } = await chai.request(app)
    .post('/login')
    .send(customer);
    tokenSession = body.token;
  });

  it('should return 200 and array of orders', () => {
    chai.request(app)
    .get(path)
    .set('authorization', tokenSession)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.not.be.undefined;
    });
  });

  it('should return 401 without token', () => {
    chai.request(app)
    .get(path)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(401);
      expect(res.body.message).to.be.equal('Unauthorized, token not found');
    });
  })

});

describe('Integration Test GET /customer/orders/:id', () => {

  const path = '/customer/orders';

  const customer = {
    email: "user@deliveryapp.com",
    password: "user1234"
  }

  const mockOrder = {
    products: [{
      productId: 1,
      quantity: 1
    }],
    sellerId: 1,
    totalPrice: 100,
    deliveryAddress: 'Rua teste',
    deliveryNumber: 123
  };

  let tokenSession;

  let saleId;

  before(async () => {
    const { body: bodyLogin } = await chai.request(app)
    .post('/login')
    .send(customer);
    tokenSession = bodyLogin.token;
    const { body: bodyOrder } = await chai.request(app)
    .post('/customer/order')
    .set('authorization', tokenSession)
    .send(mockOrder);
    saleId = bodyOrder.saleId;
  });

  it('should return 200 and array of sellers', () => {
    chai.request(app)
    .get(`${path}/${saleId}`)
    .set('authorization', tokenSession)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.not.be.undefined;
    });
  });

  it('should return 401 without token', () => {
    chai.request(app)
    .get(`${path}/${saleId}`)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(401);
      expect(res.body.message).to.be.equal('Unauthorized, token not found');
    });
  });

  it('should return 400 on requesting sale that does exist', () => {
    chai.request(app)
    .get(`${path}/9999`)
    .set('authorization', tokenSession)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.body.message).to.be.equal('Not Found');
    });
  });

  it('should return 401 on requesting sale from another user', () => {
    chai.request(app)
    .get(`${path}/1`)
    .set('authorization', tokenSession)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(401);
      expect(res.body.message).to.be.equal('Not the customer who ordered');
    });
  });

});

describe('Integration Test GET /seller/orders', () => {

  const path = '/seller/orders';

  const seller = {
    email: "fulana@deliveryapp.com",
    password: "fulana@123"
  }

  let tokenSession;

  before(async () => {
    const { body } = await chai.request(app)
    .post('/login')
    .send(seller);
    tokenSession = body.token;
  });

  it('should return 200 and array of orders', () => {
    chai.request(app)
    .get(path)
    .set('authorization', tokenSession)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.not.be.undefined;
    });
  });

  it('should return 401 without token', () => {
    chai.request(app)
    .get(path)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(401);
      expect(res.body.message).to.be.equal('Unauthorized, token not found');
    });
  });

});
