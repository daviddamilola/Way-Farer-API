import debug from 'debug';
import Utils from '../utils/utils';
import User from '../models/User';
import auth from '../middlewares/auth';

const log = debug('server/debug');
const {
  response, hashPassword, comparePassword, insert, errResponse, update,
} = Utils;
const { makeToken } = auth;

class Users {
  static welcomeSignUp(req, res) {
    return response(res, 200, 'welcome to the sign up page');
  }

  /**
 * registers a new user
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */
  static async signUp(req, res) {
    const {
      email, first_name, last_name, password,
    } = req.body;
    const protectedPassword = hashPassword(password);
    const newUser = new User(email, first_name, last_name, protectedPassword);
    try {
      const row = await insert('users',
        'email, first_name, last_name, password, is_admin, registered_on',
        [newUser.email, newUser.first_name, newUser.last_name, newUser.password, newUser.is_admin, newUser.registered_on], '$1, $2, $3, $4, $5, $6');
      const rowData = row[0];
      const token = makeToken(rowData.id, rowData.email, rowData.first_name, rowData.last_name, rowData.is_admin);
      const data = {
        user_id: rowData.id,
        is_admin: rowData.is_admin,
        token,
      };
      return response(res, 201, data);
    } catch (errors) {
      log(errors);
      return errResponse(res, 500, 'an error occured try again later');
    }
  }

  /**
 * logs in a registered user
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const targetUser = await User.signIn(email);
      if (!targetUser.row) {
        return errResponse(res, 401, 'invalid login details');
      }
      const hashedPass = targetUser.row.password;
      if (!comparePassword(password, hashedPass)) {
        return errResponse(res, 401, 'invalid login details');
      }
      const { row } = targetUser;
      const { is_admin } = row;
      const token = makeToken(row.id, row.email, row.first_name, row.last_name, row.is_admin);
      const data = { user_id: row.id, is_admin, token };
      return response(res, 200, data);
    } catch (error) {
      log(error);
      return errResponse(res, 500, 'an error occured, please try again');
    }
  }

  static async createAdmin(req, res) {
    try {
      if (req.query.revoke.toLowerCase() === 'true') {
        return Users.revokeAdmin(req, res);
      }
      const { email } = req.params;
      const row = await update('users', 'is_admin=$1', 'email=$2', [true, email]);
      if (row.length < 1) {
        return errResponse(res, 404, 'no user with provided email');
      }
      return response(res, 201, { message: 'user is now an admin' });
    } catch (error) {
      return errResponse(res, 500, 'an error occurred please try again later');
    }
  }

  static async revokeAdmin(req, res) {
    try {
      const { email } = req.params;
      const row = await update('users', 'is_admin=$1', 'email=$2', [false, email]);
      if (row.length < 1) {
        return errResponse(res, 404, 'no user with provided email');
      }
      return response(res, 201, { message: 'user is no longer an admin' });
    } catch (error) {
      return errResponse(res, 500, 'an error occurred please try again later');
    }
  }
}

export default Users;
