import { expect } from 'chai';
import { mockRes } from 'sinon-express-mock';
import Util from '../utils/utils';

const { errResponse, response } = Util;
const res = mockRes();
describe('util test suite', () => {
  describe('errResponse function', () => {
    it('should return an error response', (done) => {
      expect(errResponse(res, 404, 'error message')).to.be.an('object');
      done();
    });
  });
  describe('response function', () => {
    it('should return a response', (done) => {
      const data = [];
      expect(response(res, 200, data)).to.be.an('object');
      done();
    });
  });
});
