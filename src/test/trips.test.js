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
let tripId;

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
      superTest(server)
        .post(url)
        .set('token', token)
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
          expect(res.status).to.be.equal(400);
          done();
        });
    });
    it('should not create a trip with invalid details', (done) => {
      superTest(server)
        .post(url)
        .set('token', token)
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
          expect(res.status).to.be.equal(400);
          done();
        });
    });
    it('should not create a trip with invalid details', (done) => {
      superTest(server)
        .post(url)
        .set('token', token)
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
          expect(res.status).to.be.equal(400);
          done();
        });
    });
    it('should not create a trip with invalid details', (done) => {
      superTest(server)
        .post(url)
        .set('token', token)
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
          expect(res.status).to.be.equal(400);
          done();
        });
    });
    it('should create a trip', (done) => {
      superTest(server)
        .post(url)
        .set('token', token)
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
        .set('token', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          done();
        });
    });
    it('only admin can cancel an existing trip', (done) => {
      superTest(server)
        .patch('/api/v1/trips/1')
        .set('token', token2)
        .end((err, res) => {
          expect(res.status).to.be.equal(403);
          done();
        });
    });
    describe('post /api/v1/bookings', () => {
      before((done) => {
        superTest(server)
          .post(url)
          .set('token', token)
          .send({
            bus_id: '1',
            origin: 'akure',
            destination: 'ilorin',
            trip_date: '2019-09-22',
            fare: 6000.00,
            status: 'active',
            seats: 22,
          })
          .end((err, res) => {
            tripId = res.body.data.id;
            done();
          });
      });
      it('should create a new booking for a logged in user', (done) => {
        superTest(server)
          .post('/api/v1/bookings')
          .set('token', token2)
          .send({ trip_id: tripId })
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
          .set('token', token2)
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
          .set('token', token)
          .end((err, res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body.data).to.be.an('array');
            done();
          });
      });
      it('should return filtered trips from queries provided', (done) => {
        superTest(server)
          .get('/api/v1/trips?origin=lagos')
          .set('token', token)
          .end((err, res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body.data).to.be.an('array');
            done();
          });
      });

      it('should return error if unexisting destination is provided', (done) => {
        superTest(server)
          .get('/api/v1/trips?destination=unknown')
          .set('token', token)
          .end((err, res) => {
            expect(res.status).to.be.equal(404);
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
