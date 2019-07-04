"use strict";

var _chai = require("chai");

var _sinonExpressMock = require("sinon-express-mock");

var _utils = _interopRequireDefault(require("../utils/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var errResponse = _utils["default"].errResponse,
    response = _utils["default"].response;
var res = (0, _sinonExpressMock.mockRes)();
describe('util test suite', function () {
  describe('errResponse function', function () {
    it('should return an error response', function (done) {
      (0, _chai.expect)(errResponse(res, 404, 'error message')).to.be.an('object');
      done();
    });
  });
  describe('response function', function () {
    it('should return a response', function (done) {
      var data = [];
      (0, _chai.expect)(response(res, 200, data)).to.be.an('object');
      done();
    });
  });
});