import { expect } from 'chai';
import superTest from 'supertest';
import debug from 'debug';
import server from '../server';
import db from '../db';

const { pg, initTables } = db;

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
  createTables();
  emptyTable();
  done();
});

const validUser = {
  email: 'dan@gmail.com',
  first_name: 'david',
  last_name: 'damilola',
  password: 'David20@$',
};

const emptyUser = {
  email: undefined,
  first_name: undefined,
  last_name: undefined,
  password: undefined,
};

const invalidUserEmail = {
  email: 'dangmail.com',
  first_name: 'david',
  last_name: 'damilola',
  password: 'David20@$',
};

const invalidUserPassword = {
  email: 'dan@gmail.com',
  first_name: 'david',
  last_name: 'damilola',
  password: 'David',
};

const invalidFirstName = {
  email: 'dan@gmail.com',
  first_name: 'david34',
  last_name: 'damilola',
  password: 'David',
};

const invalidLastName = {
  email: 'dan@gmail.com',
  first_name: 'david',
  last_name: 'damilola56',
  password: 'David',
};


const url = '/api/v1/auth/signup';
describe('user controller', () => {
  describe('post /api/v1/auth/signup', () => {
    it('should sign up a user with valid details', (done) => {
      superTest(server)
        .post(url)
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
        .post(url)
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
        .post(url)
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
        .post(url)
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
        .post(url)
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
        .post(url)
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
});
