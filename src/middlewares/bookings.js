import Utils from '../utils/utils';

const { selectWhere, errResponse } = Utils;

class Bookings {
  static async checkIfTripExists(req, res, next) {
    try {
      const { trip_id } = req.body;
      const rows = await selectWhere('trip', '*', 'id= $1', [trip_id]);
      if (!rows) {
        return errResponse(res, 409, 'no active trip with provided id');
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
