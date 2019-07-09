import { expect } from 'chai';
import auth from '../middlewares/auth';


const { makeToken, verifyToken } = auth;


describe('auth middle ware', () => {
  describe('makeToken', () => {
    it('should make a token from provided object', (done) => {
      expect(makeToken({
        id: 1,
        email: 'dan@gmail.com',
        is_admin: false,
        first_name: 'david',
        last_name: 'damilola',
      })).to.be.a('string');
      done();
    });
  });
  describe('verifyToken', () => {
    it('should validate a provided token', (done) => {
      expect(verifyToken(makeToken({
        id: 1,
        email: 'dan@gmail.com',
        is_admin: false,
        first_name: 'david',
        last_name: 'damilola',
      })).payload.id).to.be.an('object');
      done();
    });
  });
});
