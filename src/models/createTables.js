const QueryModel = {

  createUsersTable: `CREATE TABLE IF NOT EXISTS users(
    id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    email VARCHAR(128) UNIQUE NOT NULL,
    first_name VARCHAR(128),
    last_name VARCHAR(128),
    password VARCHAR(128) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false,
    registered_on DATE NOT NULL
    );`,

  createBusTable: `CREATE TABLE IF NOT EXISTS bus(
    id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    number_plate VARCHAR(128) UNIQUE NOT NULL,
    manufacturer VARCHAR(128) NOT NULL,
    model VARCHAR(128) NOT NULL,
    year VARCHAR(128) NOT NULL,
    capacity INT NOT NULL,
    created_on DATE NOT NULL
  );`,

  createTripTable: `
  CREATE TABLE IF NOT EXISTS trip(
    id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    bus_id INT  NOT NULL,
    origin VARCHAR(128) NOT NULL,
    destination VARCHAR(128) NOT NULL,
    trip_date DATE NOT NULL,
    fare FLOAT NOT NULL,
    status FLOAT NOT NULL,
    created_on DATE NOT NULL);
  `,

  createBookingsTable: `
  CREATE TABLE IF NOT EXISTS bookings(
    id SERIAL NOT NULL,
    trip_id INT NOT NULL,
    user_id INT NOT NULL,
    created_on DATE NOT NULL,
    PRIMARY KEY(trip_id, user_id));
  `,

  alterBookingsTable: `ALTER TABLE bookings
  ADD CONSTRAINT fk_bookings_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  ADD CONSTRAINT fk_bookings_trip FOREIGN KEY (trip_id) REFERENCES trip(id) ON DELETE CASCADE`,

  alterRepaymentTable: `ALTER TABLE repayments 
                      ADD CONSTRAINT fk_repayments_loans FOREIGN KEY (loanid) REFERENCES loans(id);`,

  alterTripTable: `ALTER TABLE trip
                     ADD CONSTRAINT fk_trip_bus FOREIGN KEY (bus_id) REFERENCES bus(id) ON DELETE CASCADE`,
};

export default QueryModel;
