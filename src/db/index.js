import { Pool } from 'pg';
import dotenv from 'dotenv';
import debug from 'debug';
import 'regenerator-runtime/runtime';
import queries from '../models/createTables';

dotenv.config();

let configdb;

if (process.env.NODE_ENV === 'test') {
  debug('server/debug')('executed test');
  configdb = {
    connectionString: process.env.TEST_DATABASE_URL,
  };
}
if (process.env.NODE_ENV !== 'test') {
  configdb = {
    connectionString: process.env.DATABASE_URL,
  };
}

const pool = new Pool(configdb);

pool.on('connect', () => {
  debug('server/debug')('connected to the database');
});

pool.on('remove', () => {
  debug('server/debug')('client removed');
});

const execute = async () => {
  try {
    await pool.connect();
    debug('server/debug')(`db connected successfully in ${process.env.NODE_ENV} mode`);
  } catch (error) {
    debug('server/debug')(`oops error occured: ${error}`);
  }
};
execute();

const pg = {
  query: (...params) => {
    if (params.length > 1) {
      return pool.query(params[0], params[1]);
    }
    return pool.query(params[0]);
  },
};

const initTables = async () => {
  try {
    await pg.query(queries.createUsersTable);
    await pg.query(queries.createBusTable);
    await pg.query(queries.createTripTable);
    await pg.query(queries.createBookingsTable);
    await pg.query(queries.alterTripTable);
    await pg.query(queries.alterBookingsTable);
    await pg.query(queries.seedBus);
  } catch (error) {
    debug('server/debug')(`oops error occured: ${error}`);
  }
};

initTables();

export default { pg, initTables };
