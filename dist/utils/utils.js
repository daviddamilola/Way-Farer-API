"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
  }]);

  return Utils;
}();

var _default = Utils;
exports["default"] = _default;