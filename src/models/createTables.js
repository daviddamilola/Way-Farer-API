import bycrypt from 'bcrypt-nodejs';

const hashPassword = (password) => {
  return bycrypt.hashSync(password);
}

const QueryModel = {

  createUsersTable: `CREATE TABLE IF NOT EXISTS users(
    id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    email VARCHAR(128) UNIQUE NOT NULL,
    first_name VARCHAR(128),
    last_name VARCHAR(128),
    password VARCHAR(128) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false,
    registered_on DATE NOT NULL DEFAULT CURRENT_DATE
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
    seats_available INT NOT NULL,
    status VARCHAR(127) NOT NULL DEFAULT ('active'),
    created_on DATE NOT NULL);
  `,

  createBookingsTable: `
  CREATE TABLE IF NOT EXISTS bookings(
    booking_id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    trip_id INT NOT NULL,
    bus_id INT NOT NULL,
    trip_date DATE NOT NULL,
    seat_number INT NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    created_on DATE NOT NULL);
  `,

  alterBookingsTable: `ALTER TABLE bookings
  ADD CONSTRAINT fk_bookings_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  ADD CONSTRAINT fk_bookings_trip FOREIGN KEY (trip_id) REFERENCES trip(id) ON DELETE CASCADE`,

  alterTripTable: `ALTER TABLE trip
                     ADD CONSTRAINT fk_trip_bus FOREIGN KEY (bus_id) REFERENCES bus(id) ON DELETE CASCADE`,
  seedBus: `INSERT INTO bus 
                    (number_plate, manufacturer, model, year, capacity, created_on ) 
                    VALUES 
                    ('ktu-mus-aj', 'toyota', 'hiace', 2015, 22, '10-07-2019'),
                    ('ghy-908-lg', 'toyota', 'hiace', 2015, 22, '10-07-2019'),
                    ('htu-452-kn', 'toyota', 'hiace', 2015, 22, '10-07-2019'),
                    ('kio-998-os', 'toyota', 'hiace', 2015, 22, '10-07-2019'),
                    ('pil-657-on', 'toyota', 'hiace', 2015, 22, '10-07-2019'),
                    ('rew-345-kw', 'toyota', 'hiace', 2015, 22, '10-07-2019')`,
  seedAdmin: `INSERT INTO users
  (email, first_name, last_name, password, is_admin)
  VALUES
  ('damola@wayfareradmin.com','david' , 'oluwasusi', '${hashPassword('David20@$')}', true)`,
};

export default QueryModel;
