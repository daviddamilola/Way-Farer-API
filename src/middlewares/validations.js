import Validator from './validate';
import isAdmin from './isAdmin';
import busCheck from './bus';
import bookingsMiddleware from './bookings';
import auth from './auth';

const { authorize, checkExistingUser } = auth;
const {
  checkIfTripExists,
  tripDateIsValid,
  checkIfTripIsCancelled,
  checkCreateTripDate,
  checkIfBookingExists,
} = bookingsMiddleware;

const {
  checkIfBusExists,
  checkIfBusIsSheduled,
  checkValidSeats,
} = busCheck;

const { checkIfAdmin } = isAdmin;

const {
  validateEmail,
  validateFirstName,
  validateLastName,
  checkTripId,
  checkparamId,
  validatePassword,
  checkDate,
  checkBusId,
  checkDestination,
  checkOrigin,
  checkFare,
  checkSeats,
} = Validator;

const validations = {
  validateSignUp: [validateEmail, validateFirstName, validateLastName, validatePassword, checkExistingUser],

  validateCreateAdmin: [authorize, checkIfAdmin],

  validateCreateTrip: [authorize, checkIfAdmin, checkBusId, checkIfBusExists, checkFare, checkCreateTripDate,
    checkIfBusIsSheduled, checkSeats, checkDate, checkDestination, checkOrigin, checkValidSeats],

  validateViewTrips: [authorize],

  validateCancelTrip: [authorize, checkIfAdmin, checkparamId],

  validateCreateBooking: [authorize, checkIfBookingExists, checkTripId, checkIfTripExists,
    checkIfTripIsCancelled, tripDateIsValid],

  validateViewBookings: [authorize],

  validateDeleteBookings: [authorize],
};

export default validations;
