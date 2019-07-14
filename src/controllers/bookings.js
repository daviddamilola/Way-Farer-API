import Utils from '../utils/utils';
import Booking from '../models/Booking';
import Auth from '../middlewares/auth';

const { verifyToken } = Auth;
const {
  selectWhere, update, insert, response, errResponse,
} = Utils;
class Bookings {
  static async createBooking(req, res) {
    const { trip_id } = req.body;
    const {
      id, first_name, last_name, email, is_admin,
    } = verifyToken(req.token).payload;
    if (is_admin) {
      return errResponse(res, 409, 'admin cannot book a trip');
    }
    const user_id = id;
    try {
      const tripInfo = await Bookings.getTripInfo(trip_id);
      const seat_number = await Bookings.generateSeatNumber(trip_id);
      const newBooking = new Booking(trip_id, user_id);
      const date = tripInfo.trip_date;
      const row = await insert('bookings', 'trip_id, user_id, created_on', [trip_id, user_id, newBooking.created_on], '$1,$2,$3');
      const data = {
        booking_id: row[0].id,
        user_id,
        trip_id,
        trip_date: date,
        seat_number,
        first_name,
        last_name,
        email,
      };
      return response(res, 201, data);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return errResponse(res, 422, 'you can only make one booking per trip');
      }
      return errResponse(res, 500, error);
    }
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
