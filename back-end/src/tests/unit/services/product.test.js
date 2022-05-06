const productService = require('../../../api/services/product');
const { Product } = require('../../../database/models');
const Sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;

describe('Product Service', () => {

  const mockDocument = {
    id: 1,
    name: 'bebida',
    price: 10.99,
    url_image: 'http://url_image.com',
  };

  const mockWrongDocument = {
    id: '1',
    name: 3,
    price: '10.99',
    url_image: true,
  };

  const mockList = [
    {
      id: 1,
      name: 'bebida',
      price: 10.99,
      url_image: 'http://url_image.com',
    },
    {
      id: 2,
      name: 'bebida2',
      price: 11.99,
      url_image: 'http://url_image2.com',
    },
  ];

  describe('Testing createNew method', () => {

    describe('with correct data', ()=> {

      before(() => {
        Sinon.stub(Product, 'create').resolves(mockDocument);
      });

      after(() => {
        Sinon.restore()
      });

      it('Return the created product', async () => {
        const product = await productService.createNew(mockDocument);
        expect(product).to.be.equal(mockDocument);
      });
    })

    describe('with incorrect data', ()=> {

      before(() => {
        Sinon.stub(Product, 'create').resolves(undefined);
      });

      after(() => {
        Sinon.restore()
      });

      it('Return the created Car', async () => {
        const product = await productService.createNew(mockWrongDocument);
        expect(product).to.be.equal(undefined);
      });
    });

  });

  describe('Testing getAll method', () => {

    describe('with populated DB', ()=> {

      before(() => {
        Sinon.stub(Product, 'findAll').resolves(mockList);
      });

      after(() => {
        Sinon.restore();
      });

      it('Return the created product', async () => {
        const products = await productService.getAll();
        expect(products).to.be.equal(mockList);
      });
    });

    describe('with empty DB', ()=> {

      before(() => {
        Sinon.stub(Product, 'findAll').resolves(undefined);
      });

      after(() => {
        Sinon.restore();
      });

      it('Return the created product', async () => {
        const products = await productService.getAll();
        expect(products).to.be.equal(undefined);
      });
    });

  });

  describe('Testing getById method', () => {

    describe('with correct data', ()=> {

      before(() => {
        Sinon.stub(Product, 'findOne').resolves(mockDocument);
      });

      after(() => {
        Sinon.restore();
      });

      it('Return the finded Product', async () => {
        const product = await productService.getById(1);
        expect(product).to.be.equal(mockDocument);
      })
    })

    describe('with incorrect data', ()=> {

      before(() => {
        Sinon.stub(Product, 'findOne').resolves(null);
      });

      after(() => {
        Sinon.restore();
      })

      it('Return null', async () => {
        const product = await productService.getById(99);
        expect(product).to.be.equal(null);
      });
    });

  });

  describe('Testing update method', () => {

    describe('with correct data', ()=> {

      before(() => {
        Sinon.stub(Product, 'update').resolves(mockDocument);
      });

      after(() => {
        Sinon.restore();
      });

      it('Return the updated product', async () => {
        const product = await productService.update(mockDocument, 1);
        expect(product).to.be.equal(mockDocument);
      });
    });

    describe('with incorrect data', ()=> {

      before(() => {
        Sinon.stub(Product, 'update').resolves(null);
      });

      after(() => {
        Sinon.restore();
      });

      it('Return null', async () => {
        const product = await productService.update(mockDocument, 99);
        expect(product).to.be.equal(null);
      });
    });

  });

  describe('Testing remove method', () => {

    describe('with correct data', ()=> {

      before(() => {
        Sinon.stub(Product, 'destroy').resolves(mockDocument);
      });

      after(() => {
        Sinon.restore();
      });

      it('Return the deleted Car', async () => {
        const product = await productService.remove(1);
        expect(product).to.be.equal(mockDocument);
      });
    });

    describe('with incorrect data', ()=> {

      before(() => {
        Sinon.stub(Product, 'destroy').resolves(null);
      });

      after(() => {
        Sinon.restore();
      });

      it('Return null', async () => {
        const product = await productService.remove(99);
        expect(product).to.be.equal(null);
      });
    });

  });
});
