import debug from 'debug';
import Utils from '../utils/utils';
import User from '../models/User';
import auth from '../middlewares/auth';
import Admin from '../models/Admin';

const log = debug('server/debug');
const {
  response, hashPassword, comparePassword, insert, errResponse,
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
    const newUser = /@wayfareradmin/.test(email)
      ? new Admin(email, first_name, last_name, protectedPassword)
      : new User(email, first_name, last_name, protectedPassword);
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
      if (errors.routine === '_bt_check_unique') {
        return errResponse(res, 409, 'user already exists');
      }
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
        return errResponse(res, 404, 'user does not exist');
      }
      const hashedPass = targetUser.row.password;
      if (!comparePassword(password, hashedPass)) {
        return errResponse(res, 401, 'password is incorrect');
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
}

export default Users;
