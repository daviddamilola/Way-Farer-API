import Utils from '../utils/utils';
import auth from './auth';

const { selectWhere, errResponse } = Utils;
const { verifyToken } = auth;

class Bookings {
  static async checkIfBookingExists(req, res, next) {
    try {
      const { id } = verifyToken(req.headers.token).payload;
      const rows = await selectWhere('bookings', '*', 'user_id= $1', [id]);
      if (rows.length > 0) {
        return errResponse(res, 409, 'you already have a booking');
      }
      return next();
    } catch (error) {
      return errResponse(res, 500, 'an error occurred please try again later');
    }
  }

  static async checkIfTripExists(req, res, next) {
    try {
      const { trip_id } = req.body;
      const rows = await selectWhere('trip', '*', 'id= $1', [trip_id]);
      if (rows.length < 1) {
        return errResponse(res, 400, 'no active trip with provided id');
      }
      if (!(rows[0].status === 'active')) {
        return errResponse(res, 409, 'trip is cancelled');
      }
      return next();
    } catch (error) {
      return errResponse(res, 500, 'an error occurred please try again later');
    }
  }

  static async checkIfTripIsCancelled(req, res, next) {
    try {
      const tripid = req.params.trip_id || req.body.trip_id;
      const rows = await selectWhere('trip', '*', 'id=$1', [tripid]);
      if (rows.length < 1) {
        return errResponse(res, 422, 'No trip with provided id');
      }
      if (rows[0].status === 'cancelled') {
        return errResponse(res, 400, 'the trip is already cancelled');
      }
      return next();
    } catch (error) {
      return errResponse(res, 500, 'an error occured, try again');
    }
  }

  static checkCreateTripDate(req, res, next) {
    const { trip_date } = req.body;
    if (new Date(trip_date) < new Date()) {
      return errResponse(res, 400, 'trip date is in the past thus is invalid');
    }
    return next();
  }


  static async tripDateIsValid(req, res, next) {
    try {
      const { trip_id } = req.body;
      const row = await selectWhere('trip', '*', 'id=$1', [trip_id]);
      const tripInfo = row[0];
      const pastTrip = new Date() < tripInfo.trip_date ? null : true;
      if (pastTrip) {
        return errResponse(res, 400, `the trip is past, it occurred on ${new Date(tripInfo.trip_date).toDateString()} and is no longer valid`);
      }
      return next();
    } catch (error) {
      return errResponse(res, 500, 'an error occurred please try again later');
    }
  }
}

export default Bookings;
