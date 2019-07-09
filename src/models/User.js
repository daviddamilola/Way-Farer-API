import utils from '../utils/utils';

const { selectWhere } = utils;
class User {
  constructor(reqEmail, reqFirst_name, reqLast_name, hashed_pass) {
    this.email = reqEmail;
    this.first_name = reqFirst_name;
    this.last_name = reqLast_name;
    this.password = hashed_pass;
    this.is_admin = false;
    this.registered_on = new Date();
  }

  static async signIn(email) {
    try {
      const result = await selectWhere('users', '*', 'email=$1', [email]);
      return { row: result[0] };
    } catch (errors) {
      return { error: errors };
    }
  }
}

export default User;
