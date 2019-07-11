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
    const { bus_id } = req.body;
    const row = await selectWhere('trip', 'destination', 'bus_id=$1', [bus_id]);
    if (row.length) {
      return errResponse(res, 409, `the bus with bus_id provided is already sheduled to go to ${row[0].destination}`);
    }
    return next();
  }
}

export default busCheck;
