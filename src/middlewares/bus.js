import Utils from '../utils/utils';

const { errResponse, selectWhere } = Utils;
class busCheck {
  static async checkIfBusExists(req, res, next) {
    const { bus_id } = req.body;
    const row = await selectWhere('bus', 'id', 'id=$1', [bus_id]);
    if (row.length) {
      return next();
    }
    return errResponse(res, 404, 'bus does not exist');
  }

  static async checkIfBusIsSheduled(req, res, next) {
    try {
      const { bus_id } = req.body;
      const row = await selectWhere('trip', 'destination, trip_date, status', 'bus_id=$1 AND status=$2', [bus_id, 'active']);
      if (row.length > 0) {
        if (row[0].trip_date > new Date() && row[0].status === 'active') {
          return errResponse(res, 409, `the bus with bus_id provided is already sheduled to go to ${row[0].destination}`);
        }
      }
      return next();
    } catch (error) {
      return errResponse(res, 500, 'an error occurred, pls try again');
    }
  }

  static async checkValidSeats(req, res, next) {
    const { bus_id, seats } = req.body;
    const row = await selectWhere('bus', 'capacity', 'id=$1', [bus_id]);
    if (row[0].capacity < seats) {
      return errResponse(res, 409, `seats allocated is more than bus capacity which is ${row[0].capacity}`);
    }
    return next();
  }
}

export default busCheck;
