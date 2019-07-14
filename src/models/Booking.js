import moment from 'moment';

class Booking {
  constructor(trip_id, user_id) {
    this.trip_id = trip_id;
    this.user_id = user_id;
    this.created_on = moment(new Date(), 'l-l-l-l');
  }
}

export default Booking;
