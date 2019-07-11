import User from './User';

class Admin extends User {
  constructor(reqEmail, reqFirst_name, reqLast_name, hashed_pass) {
    super(reqEmail, reqFirst_name, reqLast_name, hashed_pass);
    super.is_admin = true;
  }
}

export default Admin;
