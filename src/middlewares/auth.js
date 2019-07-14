
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Authenticate = {
  makeToken: (id, email, first_name, last_name, is_admin) => {
    const token = jwt.sign({
      id, email, first_name, last_name, is_admin,
    }, process.env.SECRET, { expiresIn: '24h' });
    return token;
  },

  verifyToken: token => jwt.decode(token, { complete: true, json: true }),
};

export default Authenticate;
