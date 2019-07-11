import moment from 'moment';
import Trip from '../models/Trip';
import Utils from '../utils/utils';


const {
  insert, response, errResponse, selectWhere,
} = Utils;
class Trips {
  static async createTrip(req, res) {
    const {
      bus_id, origin, destination, fare, status,
    } = req.body;
    const trip_date = moment(new Date(), 'l-l-l');
    try {
      const trip = new Trip(bus_id, origin, destination, trip_date, fare, status);
      const rows = await insert('trip', 'bus_id, origin, destination, trip_Date, fare, status, created_on',
        [trip.bus_id, trip.origin, trip.destination, trip.trip_date, trip.fare, trip.status, trip.createdOn],
        '$1, $2, $3, $4, $5, $6, $7');
      const result = rows[0];
      const data = {
        trip_id: result.id,
        bus_id: result.bus_id,
        origin: result.origin,
        destination: result.destination,
        trip_date: result.trip_Date,
        fare: result.fare,
      };
      return response(res, 201, data);
    } catch (error) {
      return errResponse(res, 500, 'an error occured please try again later');
    }
  }

  static async viewTrips(req, res) {
    try {
      const rows = await selectWhere('trip', 'id, bus_id, origin, destination, trip_date, fare', 'status= $1', ['active']);
      const data = rows.map((trip) => {
        const obj = {
          trip_id: trip.id,
          bus_id: trip.bus_id,
          origin: trip.origin,
          destination: trip.destination,
          trip_date: trip.trip_Date,
          fare: trip.fare.toFixed(2),
        };
        return obj;
      });
      if (rows.length < 1) {
        return errResponse(res, 404, 'no trips are currently available');
      }
      return response(res, 200, data);
    } catch (error) {
      return errResponse(res, 500, 'an error occurred, try again later');
    }
  }
}


export default Trips;
