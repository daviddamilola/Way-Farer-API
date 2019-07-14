import Utils from '../utils/utils';
import Auth from './auth';

const { errResponse } = Utils;
const { verifyToken } = Auth;

class IsAdmin {
  static checkIfAdmin(req, res, next) {
    const { is_admin } = verifyToken(req.token).payload;
    if (is_admin) {
      return next();
    }
    return errResponse(res, 403, 'only admins can create a trip');
  }
}

export default IsAdmin;
