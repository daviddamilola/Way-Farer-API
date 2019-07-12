"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var _index = _interopRequireDefault(require("../db/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pg = _index["default"].pg;

var Utils =
/*#__PURE__*/
function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "errResponse",

    /**
     * send an error response
     *
     * @param {res, status, error} the error status and error text
     * @return {json} json containing error and status code
     */
    value: function errResponse(res, status, error) {
      return res.status(status).json({
        status: 'error',
        error: error
      });
    }
    /**
     * returns a response with the data passed in
     *
     * @param {res, status, data} res: the response object,
     *  status: status code, data: data to be returned
     * @return {json object} .
     */

  }, {
    key: "response",
    value: function response(res, status, data) {
      return res.status(status).json({
        status: 'success',
        data: data
      });
    }
  }, {
    key: "insert",
    value: function () {
      var _insert = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(table, columnnames) {
        var values,
            selector,
            queryString,
            _ref,
            rows,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                values = _args.length > 2 && _args[2] !== undefined ? _args[2] : [];
                selector = _args.length > 3 ? _args[3] : undefined;
                queryString = "INSERT INTO ".concat(table, " (").concat(columnnames, ") VALUES (").concat(selector, ") RETURNING *");
                _context.prev = 3;
                _context.next = 6;
                return pg.query(queryString, values);

              case 6:
                _ref = _context.sent;
                rows = _ref.rows;
                return _context.abrupt("return", rows);

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](3);
                throw _context.t0;

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 11]]);
      }));

      function insert(_x, _x2) {
        return _insert.apply(this, arguments);
      }

      return insert;
    }()
  }, {
    key: "select",
    value: function () {
      var _select = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(table, column) {
        var queryString, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                queryString = "SELECT ".concat(column, " FROM ").concat(table);
                _context2.prev = 1;
                _context2.next = 4;
                return pg.query(queryString);

              case 4:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                return _context2.abrupt("return", rows);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](1);
                throw _context2.t0;

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 9]]);
      }));

      function select(_x3, _x4) {
        return _select.apply(this, arguments);
      }

      return select;
    }()
  }, {
    key: "selectWhere",
    value: function () {
      var _selectWhere = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(table_name, select_list, condition, values) {
        var queryString, _ref3, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                queryString = "SELECT ".concat(select_list, " FROM ").concat(table_name, " WHERE ").concat(condition, ";");
                _context3.prev = 1;
                _context3.next = 4;
                return pg.query(queryString, values);

              case 4:
                _ref3 = _context3.sent;
                rows = _ref3.rows;
                return _context3.abrupt("return", rows);

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](1);
                throw _context3.t0;

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 9]]);
      }));

      function selectWhere(_x5, _x6, _x7, _x8) {
        return _selectWhere.apply(this, arguments);
      }

      return selectWhere;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(table_name, columns, condition, values) {
        var queryString, _ref4, rows;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                queryString = "UPDATE ".concat(table_name, " SET ").concat(columns, " WHERE ").concat(condition, " returning *");
                _context4.prev = 1;
                _context4.next = 4;
                return pg.query(queryString, values);

              case 4:
                _ref4 = _context4.sent;
                rows = _ref4.rows;
                return _context4.abrupt("return", rows);

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](1);
                throw _context4.t0;

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 9]]);
      }));

      function update(_x9, _x10, _x11, _x12) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "deleteWhere",
    value: function () {
      var _deleteWhere = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(table_name, condition, values) {
        var queryString, _ref5, rows;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                queryString = "DELETE FROM ".concat(table_name, " WHERE ").concat(condition);
                _context5.prev = 1;
                _context5.next = 4;
                return pg.query(queryString, values);

              case 4:
                _ref5 = _context5.sent;
                rows = _ref5.rows;
                return _context5.abrupt("return", rows);

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](1);
                throw _context5.t0;

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 9]]);
      }));

      function deleteWhere(_x13, _x14, _x15) {
        return _deleteWhere.apply(this, arguments);
      }

      return deleteWhere;
    }()
  }, {
    key: "hashPassword",
    value: function hashPassword(password) {
      return _bcryptNodejs["default"].hashSync(password);
    }
  }, {
    key: "comparePassword",
    value: function comparePassword(password, hash) {
      return _bcryptNodejs["default"].compareSync(password, hash);
    }
  }]);

  return Utils;
}();

var _default = Utils;
exports["default"] = _default;