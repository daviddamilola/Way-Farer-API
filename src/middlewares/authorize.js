import Utils from '../utils/utils';

const { errResponse } = Utils;
class Authorize {
  static authorize(req, res, next) {
    const token = req.headers.token || req.body.token;
    if (token === undefined) {
      return errResponse(res, 401, 'unauthorized, login or sign up to access');
    }
    return next();
  }
}

export default Authorize;
