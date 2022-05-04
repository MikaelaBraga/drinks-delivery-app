const userService = require('../../api/services/user');
const { User } = require('../../api/database/models');
const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;

describe('Unit Test Login', () => {

  const mockBodyIncorrect = {
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: 'senhaerrada'
  }

  const mockBodyCorrect = {
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: '--adm2@21!!--'
  }

  const mockUser = {
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: 'a4c86edecc5aee06eff8fdeda69e0d04',
    role: 'administrator'
  }

  it('should call User model findOne by email on getByEmail', async () => {
    const { email } = mockUser;
    const userStub = sinon.stub(User, 'findOne').resolves(mockUser);
    const service = await userService.getByEmail(email);
    expect(userStub.calledWith({ where: { email } })).to.be.true;
    userStub.restore();
  });

  it('should return null if User is not found', async () => {
    const userStub = sinon.stub(User, 'findOne').resolves(undefined);
    const user = await userService.login(mockUser);
    expect(user).to.be.equal(null);
    userStub.restore();
  });

  it('should return null if password does not match', async () => {
    const userStub = sinon.stub(User, 'findOne').resolves(mockUser);
    const user = await userService.login(mockBodyIncorrect);
    expect(user).to.be.equal(null);
    userStub.restore();
  });

  it('should return token if password matches', async () => {
    const userStub = sinon.stub(User, 'findOne').resolves(mockUser);
    const user = await userService.login(mockBodyCorrect);
    const { token } = user;
    expect(token).to.not.be.equal(null);
    userStub.restore();
  });

})