const chaiHTTP = require('chai-http');
const chai = require('chai');
const app = require('../../api/app');

chai.use(chaiHTTP);

const { expect } = chai;

describe('Product Controller', () => {

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

    it('should return status 404 without token', ()=> {
      chai.request(app)
      .get('/customer/products')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.be.equal('Token não encontrado');
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

    it('should return status 404', ()=> {
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
        expect(res.body.message).to.be.equal('Token não encontrado');
      });
    });

  });

});
