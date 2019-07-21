import Trip from '../models/Trip';
import Utils from '../utils/utils';

const {
  insert, response, errResponse, selectWhere, update,
} = Utils;
class Trips {
  /**
 * creates a trip
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */
  static async createTrip(req, res) {
    const {
      bus_id, origin, destination, fare, seats, trip_date,
    } = req.body;
    const status = 'active';
    const date = new Date(trip_date);
    try {
      const trip = new Trip(bus_id, origin, destination, date, parseFloat(fare), status, seats);
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
      return errResponse(res, 500, 'an error occured please try again later');
    }
  }

  /**
 * views all active trip
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */
  static async viewTrips(req, res) {
    try {
      const filter = req.query;
      if (Object.keys(filter).length > 0) {
        return Trips.getFilteredTrips(req, res, filter);
      }
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
      return errResponse(res, 500, 'an error occurred, try again later');
    }
  }

  /**
 * views all active trip with filters
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */
  static async getFilteredTrips(req, res, query) {
    try {
      if (query.origin && query.destination) {
        const rows = await selectWhere('trip', '*', 'origin=$1 AND destination=$2 AND status=$3', [query.origin, query.destination, 'active']);
        if (rows.length > 0) {
          return response(res, 200, rows);
        }
        return errResponse(res, 404, 'no trips matching provided origin or destination');
      }
      if (query.origin) {
        const rows = await selectWhere('trip', '*', 'origin like $1 AND status=$2', [query.origin, 'active']);
        if (rows.length > 0) {
          return response(res, 200, rows);
        }
        return errResponse(res, 404, 'no trips matching provided origin');
      }
      if (query.destination) {
        const rows = await selectWhere('trip', '*', 'destination like $1 AND status=$2', [query.destination, 'active']);
        if (rows.length > 0) {
          return response(res, 200, rows);
        }
        return errResponse(res, 404, 'no trips matching provided destination');
      }
      return errResponse(res, 409, 'query fields should be either origin or destination');
    } catch (err) {
      return errResponse(res, 500, 'an error occurred please try again');
    }
  }

  /**
 * cancels a trip
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */
  static async cancelTrip(req, res) {
    try {
      const { tripId } = req.params;
      const rows = update('trip', 'status=$1', 'id=$2', ['cancelled', tripId]);
      if (rows.length < 1) {
        return errResponse(res, 404, 'No trip with provided id');
      }
      const data = {
        message: 'Trip cancelled successfully',
      };
      return response(res, 201, data);
    } catch (error) {
      return errResponse(res, 500, 'an error occurred, please try again later');
    }
  }
}


export default Trips;
