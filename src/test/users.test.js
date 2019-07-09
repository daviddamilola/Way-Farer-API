import { expect } from 'chai';
import superTest from 'supertest';
import debug from 'debug';
import server from '../server';
import db from '../db';
import mockUsers from '../models/mockUsers';

const { pg, initTables } = db;
const {
  validUser, emptyUser, invalidFirstName, invalidLastName, invalidUserEmail, invalidUserPassword,
  existingUser, wrongEmailLogin, wrongPasswordLogin,
} = mockUsers;

const createTables = async () => {
  try {
    await initTables();
  } catch (error) {
    debug('server/debug')(error);
  }
};

const emptyTable = async () => {
  try {
    await pg.query('truncate table users CASCADE;');
  } catch (error) {
    debug('server/debug')(error);
  }
};

before((done) => {
  emptyTable();
  done();
});

const signUpUrl = '/api/v1/auth/signup';
const signInUrl = '/api/v1/auth/signin';
describe('user controller', () => {
  describe('get /api/v1/auth/signup', () => {
    it('should get the sign up page', (done) => {
      superTest(server)
        .get(signUpUrl)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          done();
        });
    });
  });
  describe('post /api/v1/auth/signup', () => {
    it('should sign up a user with valid details', (done) => {
      superTest(server)
        .post(signUpUrl)
        .send(validUser)
        .end((err, res) => {
          expect(res.body).to.haveOwnProperty('status');
          expect(res.body).to.haveOwnProperty('data');
          expect(res.status).to.be.equal(201);
          expect(res.body.status).to.be.equal('success');
          done();
        });
    });
    it('should not sign up a user with empty details', (done) => {
      superTest(server)
        .post(signUpUrl)
        .send(emptyUser)
        .end((err, res) => {
          expect(res.body).to.haveOwnProperty('status');
          expect(res.body.status).to.be.equal('error');
          expect(res.status).to.equal(409);
          done();
        });
    });

    it('should not sign up a user with invalid email', (done) => {
      superTest(server)
        .post(signUpUrl)
        .send(invalidUserEmail)
        .end((err, res) => {
          expect(res.body).to.haveOwnProperty('status');
          expect(res.body.status).to.be.equal('error');
          expect(res.body.error).to.be.equal('Please enter a valid email');
          expect(res.status).to.equal(409);
          done();
        });
    });

    it('should not sign up a user with invalid password', (done) => {
      superTest(server)
        .post(signUpUrl)
        .send(invalidUserPassword)
        .end((err, res) => {
          expect(res.body).to.haveOwnProperty('status');
          expect(res.body.status).to.be.equal('error');
          expect(res.body.error).to.be.equal('Please supply a valid password');
          expect(res.status).to.equal(409);
          done();
        });
    });

    it('should not sign up a user with invalid first name', (done) => {
      superTest(server)
        .post(signUpUrl)
        .send(invalidFirstName)
        .end((err, res) => {
          expect(res.body).to.haveOwnProperty('status');
          expect(res.body.status).to.be.equal('error');
          expect(res.body.error).to.be.equal('Please supply a valid first name');
          expect(res.status).to.equal(409);
          done();
        });
    });

    it('should not sign up a user with invalid last name', (done) => {
      superTest(server)
        .post(signUpUrl)
        .send(invalidLastName)
        .end((err, res) => {
          expect(res.body).to.haveOwnProperty('status');
          expect(res.body.status).to.be.equal('error');
          expect(res.body.error).to.be.equal('Please supply a valid last name');
          expect(res.status).to.equal(409);
          done();
        });
    });
  });
  describe('post /api/v1/auth/signin', () => {
    it('should login an existing user', (done) => {
      superTest(server)
        .post(signInUrl)
        .send(existingUser)
        .end((err, res) => {
          expect(res.body).to.haveOwnProperty('status');
          expect(res.body).to.haveOwnProperty('data');
          expect(res.status).to.be.equal(200);
          expect(res.body.status).to.be.equal('success');
          done();
        });
    });

    it('should not login a user with wrong password', (done) => {
      superTest(server)
        .post(signInUrl)
        .send(wrongPasswordLogin)
        .end((err, res) => {
          expect(res.body).to.haveOwnProperty('status');
          expect(res.body).to.haveOwnProperty('error');
          expect(res.status).to.be.equal(401);
          expect(res.body.status).to.be.equal('error');
          done();
        });
    });

    it('should not login a user with wrong email', (done) => {
      superTest(server)
        .post(signInUrl)
        .send(wrongEmailLogin)
        .end((err, res) => {
          expect(res.body).to.haveOwnProperty('status');
          expect(res.body).to.haveOwnProperty('error');
          expect(res.status).to.be.equal(404);
          expect(res.body.status).to.be.equal('error');
          done();
        });
    });
  });
});
