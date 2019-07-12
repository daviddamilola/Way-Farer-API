"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../../controllers/users"));

var _trip = _interopRequireDefault(require("../../controllers/trip"));

var _validate = _interopRequireDefault(require("../../middlewares/validate"));

var _isAdmin = _interopRequireDefault(require("../../middlewares/isAdmin"));

var _bus = _interopRequireDefault(require("../../middlewares/bus"));

var _authorize = _interopRequireDefault(require("../../middlewares/authorize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authorize = _authorize["default"].authorize;
var checkIfBusExists = _bus["default"].checkIfBusExists,
    checkIfBusIsSheduled = _bus["default"].checkIfBusIsSheduled;
var checkIfAdmin = _isAdmin["default"].checkIfAdmin;
var validateEmail = _validate["default"].validateEmail,
    validateFirstName = _validate["default"].validateFirstName,
    validateLastName = _validate["default"].validateLastName,
    validatePassword = _validate["default"].validatePassword;
var validateSignUp = [validateEmail, validateFirstName, validateLastName, validatePassword];
var validateSignIn = [validateEmail];

var router = _express["default"].Router();

router.get('/', function (req, res) {
  res.status(200).json({
    status: 'success',
    message: 'you have reached the api route successfully'
  });
});
router.get('/auth/signup', _users["default"].welcomeSignUp).post('/auth/signup', validateSignUp, _users["default"].signUp);
router.post('/auth/signin', validateSignIn, _users["default"].signIn);
router.post('/trips', checkIfAdmin, checkIfBusExists, checkIfBusIsSheduled, _trip["default"].createTrip);
router.get('/trips', authorize, _trip["default"].viewTrips);
var _default = router;
exports["default"] = _default;