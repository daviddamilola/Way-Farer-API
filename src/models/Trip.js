class Trip {
  constructor(bus_id, origin, destination, trip_date, fare, status, seats) {
    this.bus_id = bus_id;
    this.origin = origin;
    this.destination = destination;
    this.trip_date = trip_date;
    this.fare = fare;
    this.status = status;
    this.seats = seats;
    this.createdOn = new Date();
  }
}

export default Trip;
