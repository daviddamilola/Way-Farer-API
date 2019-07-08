class User {
  constructor(reqEmail, reqFirst_name, reqLast_name, hashed_pass) {
    this.email = reqEmail;
    this.first_name = reqFirst_name;
    this.last_name = reqLast_name;
    this.password = hashed_pass;
    this.is_admin = false;
    this.registered_on = new Date();
  }
}

export default User;
