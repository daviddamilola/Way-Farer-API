
import Utils from '../utils/utils';

const { errResponse } = Utils;
class Validator {
  static validateEmail(req, res, next) {
    req.checkBody('email', 'Please enter a valid email')
      .trim()
      .not()
      .isEmpty()
      .isEmail()
      .isLength({ min: 5 })
      .isLength({ max: 50 })
      .normalizeEmail()
      .trim();
    req.asyncValidationErrors()
      .then(() => next())
      .catch(errors => errResponse(res, 400, errors[0].msg));
  }

  static validateFirstName(req, res, next) {
    req.checkBody('first_name', 'Please supply a valid first name')
      .trim()
      .not()
      .isEmpty()
      .isAlpha()
      .isLength({ max: 90 });
    req.asyncValidationErrors()
      .then(() => next())
      .catch(errors => errResponse(res, 400, errors[0].msg));
  }

  static validateLastName(req, res, next) {
    req.checkBody('last_name', 'Please supply a valid last name')
      .trim()
      .not()
      .isEmpty()
      .isAlpha()
      .isLength({ max: 90 });
    req.asyncValidationErrors()
      .then(() => next())
      .catch(errors => errResponse(res, 400, errors[0].msg));
  }

  static validatePassword(req, res, next) {
    req.checkBody('password', 'password cannot be empty and must have at least 1 uppercase letter, 1 lowercase, a number and special character ')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i');
    req.asyncValidationErrors()
      .then(() => next())
      .catch(errors => errResponse(res, 400, errors[0].msg));
  }

  static checkTripId(req, res, next) {
    req.checkBody('trip_id', 'trip_id must be an integer number and cannot be empty')
      .not()
      .isEmpty()
      .isNumeric();
    req.asyncValidationErrors()
      .then(() => next())
      .catch(errors => errResponse(res, 400, errors[0].msg));
  }

  // eslint-disable-next-line consistent-return
  static checkparamId(req, res, next) {
    req.checkParams('tripId', 'param must be an integer number and cannot be empty').isInt();
    req.asyncValidationErrors()
      .then(() => next())
      .catch(errors => errResponse(res, 400, errors[0].msg));
  }

  // eslint-disable-next-line consistent-return
  static checkBusId(req, res, next) {
    const probInt = parseInt(req.body.bus_id, 10);
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(probInt)) {
      return errResponse(res, 400, 'bus_id must be an integer number');
    }
    req.checkBody('bus_id', 'bus_id cannot be empty')
      .not()
      .isEmpty();
    req.asyncValidationErrors()
      .then(() => next())
      .catch(errors => errResponse(res, 400, errors[0].msg));
  }

  static checkOrigin(req, res, next) {
    req.checkBody('origin', 'origin cannot be empty')
      .not()
      .isEmpty();
    req.asyncValidationErrors()
      .then(() => next())
      .catch(errors => errResponse(res, 400, errors[0].msg));
  }

  static checkDestination(req, res, next) {
    req.checkBody('destination', 'destination cannot be empty')
      .not()
      .isEmpty();
    req.asyncValidationErrors()
      .then(() => next())
      .catch(errors => errResponse(res, 400, errors[0].msg));
  }

  static isNumber(number) {
    return typeof (number) === 'number';
  }

  // eslint-disable-next-line consistent-return
  static checkFare(req, res, next) {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(parseFloat(req.body.fare))) {
      return errResponse(res, 400, 'fare must be a number');
    }
    req.checkBody('fare', 'fare cannot be empty')
      .not()
      .isEmpty();
    req.asyncValidationErrors()
      .then(() => next())
      .catch(errors => errResponse(res, 400, errors[0].msg));
  }

  static checkSeats(req, res, next) {
    if (req.body.seats === undefined || req.body.seats === '') {
      req.body.seats = '22';
    }
    next();
  }

  static checkDate(req, res, next) {
    req.checkBody('trip_date', 'date should follow this format yyyy-mm-dd')
      .not()
      .isEmpty();
    req.asyncValidationErrors()
      .then(() => next())
      .catch(errors => errResponse(res, 400, errors[0].msg));
  }
}

export default Validator;
