import express from 'express';
import Users from '../../controllers/users';
import Trips from '../../controllers/trip';
import Validator from '../../middlewares/validate';
import isAdmin from '../../middlewares/isAdmin';
import busCheck from '../../middlewares/bus';
import Authorize from '../../middlewares/authorize';
import bookingsMiddleware from '../../middlewares/bookings';
import Bookings from '../../controllers/bookings';

const { authorize } = Authorize;
const { checkIfTripExists, tripDateIsValid, checkIfTripIsCancelled } = bookingsMiddleware;
const { checkIfBusExists, checkIfBusIsSheduled, checkValidSeats } = busCheck;
const { checkIfAdmin } = isAdmin;
const {
  validateEmail, validateFirstName, validateLastName, checkTripId, checkparamId, validatePassword,
  checkDate, checkBusId, checkDestination, checkOrigin, checkFare, checkSeats,
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

router.post('/trips', authorize, checkIfAdmin, checkDate, checkFare, checkSeats, checkBusId,
  checkDestination, checkOrigin, checkIfBusExists, checkIfBusIsSheduled,
  checkValidSeats, Trips.createTrip)
  .get('/trips', authorize, Trips.viewTrips);

router.patch('/trips/:tripId', authorize, checkIfAdmin, checkparamId, checkIfTripIsCancelled, Trips.cancelTrip);

router.post('/bookings', authorize, checkTripId, checkIfTripExists, tripDateIsValid, Bookings.createBooking)
  .get('/bookings', authorize, Bookings.viewBookings);

router.delete('/bookings/:bookingId', authorize, Bookings.deleteBooking);

export default router;
