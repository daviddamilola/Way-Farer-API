import express from 'express';
import Users from '../../controllers/users';
import Validator from '../../middlewares/validate';

const {
  validateEmail, validateFirstName, validateLastName, validatePassword,
} = Validator;
const validateSignUp = [validateEmail, validateFirstName, validateLastName, validatePassword];
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'you have reached the api route successfully',
  });
});

router.get('/auth/signup', Users.welcomeSignUp)
  .post('/auth/signup', validateSignUp, Users.signUp);

export default router;
