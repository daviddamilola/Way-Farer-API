"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../../controllers/users"));

var _validate = _interopRequireDefault(require("../../middlewares/validate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateEmail = _validate["default"].validateEmail,
    validateFirstName = _validate["default"].validateFirstName,
    validateLastName = _validate["default"].validateLastName,
    validatePassword = _validate["default"].validatePassword;
var validateSignUp = [validateEmail, validateFirstName, validateLastName, validatePassword];

var router = _express["default"].Router();

router.get('/', function (req, res) {
  res.status(200).json({
    status: 'success',
    message: 'you have reached the api route successfully'
  });
});
router.get('/auth/signup', _users["default"].welcomeSignUp).post('/auth/signup', validateSignUp, _users["default"].signUp);
var _default = router;
exports["default"] = _default;