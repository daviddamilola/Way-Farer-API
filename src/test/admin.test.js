import { expect } from 'chai';
import Admin from '../models/Admin';

describe('admin model', () => {
  it('it should be an object', (done) => {
    expect(new Admin('d@wayfarer.com', 'test', 'admin', 'hashde613331e8pass')).to.be.an('object');
    done();
  });
  it('should have an is_admin property', (done) => {
    expect(new Admin('d@wayfarer.com', 'test', 'admin', 'hashde613331e8pass')).to.haveOwnProperty('is_admin');
    done();
  });

  it('should be an admin', (done) => {
    expect(new Admin('d@wayfarer.com', 'test', 'admin', 'hashde613331e8pass').is_admin).to.be.equal(true);
    done();
  });
});
