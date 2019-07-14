import Utils from '../utils/utils';
import Booking from '../models/Booking';
import Auth from '../middlewares/auth';

const { verifyToken } = Auth;
const {
  selectWhere, select, update, insert, response, errResponse,
} = Utils;
class Bookings {
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
      const data = row[0];
      return response(res, 201, data);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return errResponse(res, 422, 'you can only make one booking per trip');
      }
      return errResponse(res, 500, error);
    }
  }

  static async viewBookings(req, res) {
    const details = verifyToken(req.headers.token).payload;
    let row;
    if (details.is_admin) {
      row = await select('bookings', '*');
      return response(res, 200, row);
    }
    row = await selectWhere('bookings', '*', 'user_id=$1', [details.id]);
    return response(res, 200, row);
  }

  static async getTripInfo(trip_id) {
    try {
      const row = await selectWhere('trip', '*', 'id=$1', [trip_id]);
      return row[0];
    } catch (error) {
      return error;
    }
  }

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
}

export default Bookings;
