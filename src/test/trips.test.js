import { expect } from 'chai';
import superTest from 'supertest';
import debug from 'debug';
import server from '../server';
import Utils from '../utils/utils';
import db from '../db';

const { pg } = db;
const { insert } = Utils;
const url = '/api/v1/trips';

const emptyTable = async () => {
  try {
    await pg.query('truncate table users, trip restart identity cascade;');
  } catch (error) {
    debug('server/debug')(error);
  }
};

const insertUser = async () => {
  await insert('users',
    'email, first_name, last_name, password, is_admin, registered_on',
    ['rede@wayfareradmin.com', 'test', 'dan', 'bcer745c47584525v2c', true, '10-07-2019'], '$1, $2, $3, $4, $5, $6');
};

before((done) => {
  emptyTable().then(() => {
    insertUser();
  }).then(() => {
    done();
  });
});

describe('trips controller', () => {
  describe('post /api/v1/trips', () => {
    it('should create a trip', (done) => {
      superTest(server)
        .post(url)
        .send({
          // eslint-disable-next-line max-len
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYXZpZEB3YXlmYXJlcmFkbWluLmNvbSIsImZpcnN0X25hbWUiOiJvbHV3YXN1c2kiLCJsYXN0X25hbWUiOiJkYW1pbG9sYSIsImlhdCI6MTU2Mjc1NDM5MCwiZXhwIjoxNTYyODQwNzkwfQ.OeW4SjsGV1QAbBlLk2-8LYPHj7I2r9V20ZHYE3CXE7Q',
          user_id: '1',
          is_admin: 'true',
          bus_id: '2',
          origin: 'lagos',
          destination: 'ilorin',
          trip_date: '12-07-2019',
          fare: 6000.00,
          status: 'active',
        }).end((err, res) => {
          expect(res.status).to.be.equal(201);
          done();
        });
    });
  });
});
