
import Utils from '../utils/utils';

const { errResponse } = Utils;
class Validator {
  static validateEmail(req, res, next) {
    req.checkBody('email', 'Please enter a valid email').not().isEmpty().isEmail()
      .isLength({ min: 5 })
      .isLength({ max: 50 })
      .normalizeEmail()
      .trim();
    req.asyncValidationErrors()
      .then(() => next())
      .catch(errors => errResponse(res, 409, errors[0].msg));
  }

  static validateFirstName(req, res, next) {
    req.checkBody('first_name', 'Please supply a valid first name')
      .not()
      .isEmpty()
      .isAlpha()
      .isLength({ max: 90 });
    req.asyncValidationErrors()
      .then(() => next())
      .catch(errors => errResponse(res, 409, errors[0].msg));
  }

  static validateLastName(req, res, next) {
    req.checkBody('last_name', 'Please supply a valid last name')
      .not()
      .isEmpty()
      .isAlpha()
      .isLength({ max: 90 });
    req.asyncValidationErrors()
      .then(() => next())
      .catch(errors => errResponse(res, 409, errors[0].msg));
  }

  static validatePassword(req, res, next) {
    req.checkBody('password', 'Please supply a valid password')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/);
    req.asyncValidationErrors()
      .then(() => next())
      .catch(errors => errResponse(res, 409, errors[0].msg));
  }

  static checkParam(req, res, next) {
    req.checkParams('id', 'query :id can only be an integer number').isInt();
    req.asyncValidationErrors()
      .then(() => next())
      .catch(errors => errResponse(res, 409, errors[0].msg));
  }
}

export default Validator;
