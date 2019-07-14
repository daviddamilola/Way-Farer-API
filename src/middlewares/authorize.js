import Utils from '../utils/utils';

const { errResponse } = Utils;
class Authorize {
  static authorize(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader !== undefined) {
      console.log('setting req.token....');
      req.token = bearerHeader;
    } else {
      return errResponse(res, 401, 'unauthorized, login or sign up to access');
    }
    return next();
  }
}

export default Authorize;
