import debug from 'debug';
import Utils from '../utils/utils';
import Booking from '../models/Booking';
import Auth from '../middlewares/auth';

const log = debug('server/debug');
const { verifyToken } = Auth;
const {
  selectWhere, select, update, insert, response, errResponse, deleteWhere,
} = Utils;
class Bookings {
  /**
  * creates a booking for a logged in user
  * @param {object} req
  * @param {object} res
  * @returns {json}
  */
  static async createBooking(req, res) {
    const { trip_id } = req.body;
    const {
      id, first_name, last_name, email, is_admin,
    } = verifyToken(req.headers.token).payload;
    if (is_admin) {
      return errResponse(res, 409, 'admin cannot book a trip');
    }
    const user_id = id;
    try {
      const tripInfo = await Bookings.getTripInfo(trip_id);
      const seat_number = await Bookings.generateSeatNumber(trip_id);
      const newBooking = new Booking(trip_id, user_id);
      const date = tripInfo.trip_date;
      const { bus_id } = tripInfo;
      const row = await insert('bookings', 'user_id,trip_id, bus_id, trip_date, seat_number, first_name, last_name, email, created_on',
        [user_id, trip_id, bus_id, date, seat_number, first_name, last_name, email, newBooking.created_on], '$1,$2,$3,$4,$5,$6,$7,$8,$9');
      const data = {
        id: row[0].booking_id,
        user_id: row[0].user_id,
        trip_id: row[0].trip_id,
        bus_id: row[0].bus_id,
        trip_date: row[0].trip_date,
        seat_number: row[0].seat_number,
        first_name: row[0].first_name,
        last_name: row[0].last_name,
        email: row[0].email,
      };
      return response(res, 201, data);
    } catch (error) {
      log(error);
      if (error.routine === '_bt_check_unique') {
        return errResponse(res, 422, 'you can only make one booking per trip');
      }
      log(error);
      return errResponse(res, 500, error);
    }
  }

  /**
 * gets all bookings for admin and users own booking for user
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */
  static async viewBookings(req, res) {
    const details = verifyToken(req.headers.token).payload;
    let row;
    if (details.is_admin) {
      row = await select('bookings', '*');
      return response(res, 200, row);
    }
    row = await selectWhere('bookings', '*', 'user_id=$1', [details.id]);
    log('row is', row);
    return response(res, 200, row);
  }

  /**
 * gets the details of a trip with provided id
 * @param {number} trip_id
 * @returns {object}
 */
  static async getTripInfo(trip_id) {
    try {
      const row = await selectWhere('trip', '*', 'id=$1', [trip_id]);
      return row[0];
    } catch (error) {
      return error;
    }
  }

  /**
   * generates a seat number with trip_id provided
   * @param {number} trip_id
   * @returns {number}
   */
  static async generateSeatNumber(trip_id) {
    try {
      const row = await selectWhere('trip', '*', 'id=$1', [trip_id]);
      const { seats_available } = row[0];
      const currentCapacity = seats_available - 1;
      await update('trip', 'seats_available=$1', 'id=$2', [currentCapacity, trip_id]);
      const seatNumber = 22 - currentCapacity;
      return seatNumber;
    } catch (error) {
      return error;
    }
  }

  /**
 * delete a booking for a logged in user
 * @param {object} req
 * @param {object} res
 * @returns json
 */

  static async deleteBooking(req, res) {
    const details = verifyToken(req.headers.token).payload;
    const userId = details.id;
    const { bookingId } = req.params;

    try {
      const row = await deleteWhere('bookings', 'booking_id=$1 AND user_id=$2', [bookingId, userId]);
      if (row.length < 1) {
        return errResponse(res, 404, 'the :bookingId provided is not your id');
      }
      const data = {
        message: 'Booking deleted successfully',
      };
      return response(res, 201, data);
    } catch (error) {
      return errResponse(res, 500, 'an error occurred, please try again later');
    }
  }
}

export default Bookings;
