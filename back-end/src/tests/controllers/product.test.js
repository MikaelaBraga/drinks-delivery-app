const chaiHTTP = require('chai-http');
const chai = require('chai');
const app = require('../../api/app');
const shell = require('shelljs');

shell.exec('npm run db:reset');

chai.use(chaiHTTP);

const { expect } = chai;

describe('Product Controller', () => {

  describe('Testing getAll integration', () => {

    describe('should return status 200 and products array', ()=> {
      chai.request(app)
      .get('/products')
      .send()
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });
    });

    describe('should return status 500', ()=> {
      chai.request(app)
      .get('/products')
      .send('')
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.be.equal(err.message);
      });
    });

  });

  describe('Testing getById integration', () => {

    describe('should return status 200 and founded product', ()=> {
      chai.request(app)
      .get('/products/:id')
      .send('1')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.all.keys('name', 'price', 'url_image');
      });
    });

    describe('should return status 404', ()=> {
      chai.request(app)
      .get('/products/:id')
      .send('99999999999999')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body.message).to.be.equal('not found');
      });
    });

    describe('should return status 500', ()=> {
      chai.request(app)
      .get('/products/:id')
      .send('')
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.be.equal(err.message);
      });
    });

  });

});
