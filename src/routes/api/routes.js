import express from 'express';
import Users from '../../controllers/users';
import Trips from '../../controllers/trip';
import Bookings from '../../controllers/bookings';
import validations from '../../middlewares/validations';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'you have reached the api route successfully',
  });
});

router
  .get('/auth/signup', Users.welcomeSignUp)
  .post('/auth/signup', validations.validateSignUp, Users.signUp);

router
  .patch('/users/:email', validations.validateCreateAdmin, Users.createAdmin);

router
  .post('/auth/signin', Users.signIn);

router
  .post('/trips', validations.validateCreateTrip, Trips.createTrip)
  .get('/trips', validations.validateViewTrips, Trips.viewTrips);

router
  .patch('/trips/:tripId', validations.validateCancelTrip, Trips.cancelTrip);

router
  .post('/bookings', validations.validateCreateBooking, Bookings.createBooking)
  .get('/bookings', validations.validateViewBookings, Bookings.viewBookings);


router
  .delete('/bookings/:bookingId', validations.validateDeleteBookings, Bookings.deleteBooking);

export default router;
