import { expect } from 'chai';
import superTest from 'supertest';
import debug from 'debug';
import server from '../server';
import db from '../db';

const { pg, initTables } = db;
const url = '/api/v1/trips';

const dropTable = async () => {
  try {
    await pg.query('truncate table users, trip, bookings restart identity cascade;');
  } catch (error) {
    debug('server/debug')(error);
  }
};

let token;
let token2;

before((done) => {
  initTables().then(() => {
    dropTable();
  })
    .then(() => done());
});

describe('trips controller', () => {
  describe('post /api/v1/trips', () => {
    before((done) => {
      superTest(server)
        .post('/api/v1/auth/signUp')
        .send({
          email: 'damola@wayfareradmin.com',
          password: 'David20@$',
          first_name: 'damola',
          last_name: 'david',
        })
        .end((err, res) => {
          // eslint-disable-next-line prefer-destructuring
          token = res.body.data.token;
          console.log('token in admin signup', token)
        });
      superTest(server)
        .post('/api/v1/auth/signUp')
        .send({
          email: 'damola@gmail.com',
          password: 'David20@$',
          first_name: 'damola',
          last_name: 'david',
        })
        .end((err, res) => {
          // eslint-disable-next-line prefer-destructuring
          token2 = res.body.data.token;
          done();
        });
    });
    it('should not create a trip with invalid details', (done) => {
      console.log('token in sign up', token);
      superTest(server)
        .post(url)
        .set('Authorization', token)
        .send({
          bus_id: undefined,
          origin: 'lagos',
          destination: 'ilorin',
          trip_date: '2019-07-20',
          fare: 6000.00,
          status: 'active',
          seats: 22,
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(409);
          done();
        });
    });
    it('should not create a trip with invalid details', (done) => {
      console.log('token in sign up', token);
      superTest(server)
        .post(url)
        .set('Authorization', token)
        .send({
          bus_id: '1',
          origin: undefined,
          destination: 'ilorin',
          trip_date: '2019-07-20',
          fare: 6000.00,
          status: 'active',
          seats: 22,
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(409);
          done();
        });
    });
    it('should not create a trip with invalid details', (done) => {
      console.log('token in sign up', token);
      superTest(server)
        .post(url)
        .set('Authorization', token)
        .send({
          bus_id: '1',
          origin: 'lagos',
          destination: undefined,
          trip_date: '2019-07-20',
          fare: 6000.00,
          status: 'active',
          seats: 22,
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(409);
          done();
        });
    });
    it('should not create a trip with invalid details', (done) => {
      console.log('token in sign up', token);
      superTest(server)
        .post(url)
        .set('Authorization', token)
        .send({
          bus_id: '1',
          origin: 'lagos',
          destination: 'ilorin',
          trip_date: undefined,
          fare: 6000.00,
          status: 'active',
          seats: 22,
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(409);
          done();
        });
    });
    it('should create a trip', (done) => {
      console.log('token in sign up', token);
      superTest(server)
        .post(url)
        .set('Authorization', token)
        .send({
          bus_id: '2',
          origin: 'lagos',
          destination: 'ilorin',
          trip_date: '2019-07-20',
          fare: 6000.00,
          status: 'active',
          seats: 22,
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(201);
          done();
        });
    });
    it('should validate id', (done) => {
      superTest(server)
        .patch('/api/v1/trips/e')
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(409);
          done();
        });
    });
    it('only admin can cancel an existing trip', (done) => {
      superTest(server)
        .patch('/api/v1/trips/1')
        .set('Authorization', token2)
        .end((err, res) => {
          expect(res.status).to.be.equal(403);
          done();
        });
    });
    describe('post /api/v1/bookings', () => {
      it('should create a new booking for a logged in user', (done) => {
        superTest(server)
          .post('/api/v1/bookings')
          .set('Authorization', token2)
          .send({ trip_id: 1 })
          .end((err, res) => {
            expect(res.status).to.be.equal(201);
            done();
          });
      });
    });
    describe('get /api/v1/bookings', () => {
      it('should return history of booking to user', (done) => {
        superTest(server)
          .get('/api/v1/bookings')
          .set('Authorization', token2)
          .end((err, res) => {
            expect(res.status).to.be.equal(200);
            done();
          });
      });
    });
    describe('get /api/v1/trips should return all trips to both admin and users', () => {
      it('should return an array of available trips to user or admin', (done) => {
        superTest(server)
          .get('/api/v1/trips')
          // eslint-disable-next-line max-len
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body.data).to.be.an('array');
            done();
          });
      });

      it('should not grant access to users not logged in', (done) => {
        superTest(server)
          .get('/api/v1/trips')
          // eslint-disable-next-line max-len
          .end((err, res) => {
            expect(res.status).to.be.equal(401);
            done();
          });
      });
    });
  });
});
