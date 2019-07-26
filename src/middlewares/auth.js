
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Utils from '../utils/utils';

dotenv.config();
const { errResponse, selectWhere } = Utils;

const Authenticate = {
  makeToken: (id, email, first_name, last_name, is_admin) => {
    const token = jwt.sign({
      id, email, first_name, last_name, is_admin,
    }, process.env.SECRET, { expiresIn: '24h' });
    return token;
  },

  verifyToken: token => jwt.decode(token, { complete: true, json: true }),

  authorize: (req, res, next) => {
    const token = req.headers.token.trim() || req.body.token;
    if (!token || token.length < 10) {
      return errResponse(res, 401, 'unauthorized, login or sign up to access');
    }
    return next();
  },
  checkExistingUser: async (req, res, next) => {
    try {
      const { email } = req.body;
      const rows = await selectWhere('users', '*', 'email= $1', [email]);
      if (rows.length > 0) {
        return errResponse(res, 409, 'user already exists');
      }
      return next();
    } catch (error) {
      return errResponse(res, 500, 'an error occurred please try again later');
    }
  },
};

export default Authenticate;
