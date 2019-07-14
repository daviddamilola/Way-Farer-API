import Trip from '../models/Trip';
import Utils from '../utils/utils';


const {
  insert, response, errResponse, selectWhere,
} = Utils;
class Trips {
  static async createTrip(req, res) {
    const {
      bus_id, origin, destination, fare, status, seats, trip_date,
    } = req.body;
    const date = new Date(trip_date);
    try {
      const trip = new Trip(bus_id, origin, destination, date, fare, status, seats);
      const rows = await insert('trip', 'bus_id, origin, destination, trip_Date, fare, status, seats_available, created_on',
        [trip.bus_id, trip.origin, trip.destination, trip.trip_date, trip.fare, trip.status, trip.seats, trip.createdOn],
        '$1, $2, $3, $4, $5, $6, $7, $8');
      const result = rows[0];
      const data = {
        id: result.id,
        bus_id: result.bus_id,
        origin: result.origin,
        destination: result.destination,
        trip_date: new Date(result.trip_date).toDateString(),
        fare: result.fare,
        seats_available: result.seats_available,
      };
      return response(res, 201, data);
    } catch (error) {
      console.log(error);
      return errResponse(res, 500, 'an error occured please try again later');
    }
  }

  static async viewTrips(req, res) {
    try {
      const rows = await selectWhere('trip', 'id, bus_id, origin, destination, trip_date, fare, seats_available', 'status= $1', ['active']);
      const data = rows.map((trip) => {
        const obj = {
          id: trip.id,
          bus_id: trip.bus_id,
          origin: trip.origin,
          destination: trip.destination,
          fare: trip.fare.toFixed(2),
          seats_available: trip.seats_available,
          date: new Date(trip.trip_date).toDateString(),
        };
        return obj;
      });
      if (rows.length < 1) {
        return errResponse(res, 404, 'no trips are currently available');
      }
      return response(res, 200, data);
    } catch (error) {
      console.log(error)
      return errResponse(res, 500, 'an error occurred, try again later');
    }
  }
}


export default Trips;
