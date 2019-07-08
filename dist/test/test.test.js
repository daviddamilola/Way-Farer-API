"use strict";

var _chai = require("chai");

var _supertest = _interopRequireDefault(require("supertest"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('server set up', function () {
  it(' should send all request routes through the Api route', function (done) {
    (0, _supertest["default"])(_server["default"]).get('/api/v1/').end(function (err, res) {
      (0, _chai.expect)(res.status).to.be.equal(200);
      done();
    });
  });
  it('should catch routes that are not found', function (done) {
    (0, _supertest["default"])(_server["default"]).get('/api/v1/unexistent_route').end(function (err, res) {
      (0, _chai.expect)(res.status).to.be.equal(404);
      done();
    });
  });
});