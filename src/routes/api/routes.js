import express from 'express';
import Users from '../../controllers/users';
import Validator from '../../middlewares/validate';

const {
  validateEmail, validateFirstName, validateLastName, validatePassword,
} = Validator;
const validateSignUp = [validateEmail, validateFirstName, validateLastName, validatePassword];
const validateSignIn = [validateEmail];
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'you have reached the api route successfully',
  });
});

router.get('/auth/signup', Users.welcomeSignUp)
  .post('/auth/signup', validateSignUp, Users.signUp);

router.post('/auth/signin', validateSignIn, Users.signIn);

export default router;
