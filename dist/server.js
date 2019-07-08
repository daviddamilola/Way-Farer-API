"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressValidator = _interopRequireDefault(require("express-validator"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _debug = _interopRequireDefault(require("debug"));

var _routes = _interopRequireDefault(require("./routes/api/routes"));

var _utils = _interopRequireDefault(require("./utils/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var errResponse = _utils["default"].errResponse;
var app = (0, _express["default"])();
app.set('port', process.env.PORT || 2000);
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.use((0, _expressValidator["default"])());
app.use('/api/v1', _routes["default"]);
app.all('*', function (req, res) {
  errResponse(res, 404, 'this page does not exist');
});
app.listen(app.get('port'), function () {
  (0, _debug["default"])('server/debug')("Express started on http://localhost:".concat(app.get('port'), "'; press Ctrl-C to terminate."));
});
var _default = app;
exports["default"] = _default;