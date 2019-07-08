import debug from 'debug';
import Utils from '../utils/utils';
import User from '../models/User';
import auth from '../middlewares/auth';

const { response, hashPassword, insert, errResponse } = Utils;
const { makeToken } = auth;
const log = debug('server/debug');

class Users {
  static welcomeSignUp(req, res) {
    return response(res, 200, 'welcome to the sign up page');
  }

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
      const token = makeToken(rowData.id, rowData.email, rowData.is_admin, rowData.first_name, rowData.last_name);
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
      return errResponse(res, 500, 'an error occured try again later');
    }
  }
}

export default Users;
