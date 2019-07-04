"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = _interopRequireDefault(require("./routes/api/routes"));

var _utils = _interopRequireDefault(require("./utils/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var errResponse = _utils["default"].errResponse;
var app = (0, _express["default"])();
var port = process.env.PORT || 5000;
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.use('/api/v1', _routes["default"]);
app.all('*', function (req, res) {
  errResponse(res, 404, 'this page does not exist');
});
app.listen(port, function () {
  app.listen(port, console.log("App listening on port ".concat(port)));
});
var _default = app;
exports["default"] = _default;