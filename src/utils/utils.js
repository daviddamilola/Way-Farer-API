import bycrypt from 'bcrypt-nodejs';
import db from '../db/index';

const { pg } = db;

class Utils {
  /**
   * send an error response
   *
   * @param {res, status, error} the error status and error text
   * @return {json} json containing error and status code
   */
  static errResponse(res, status, error) {
    return res.status(status).json({
      status: 'error',
      error,
    });
  }

  /**
   * returns a response with the data passed in
   *
   * @param {res, status, data} res: the response object,
   *  status: status code, data: data to be returned
   * @return {json object} .
   */

  static response(res, status, data) {
    return res.status(status).json({
      status: 'success',
      data,
    });
  }

  static async insert(table, columnnames, values = [], selector) {
    const queryString = `INSERT INTO ${table} (${columnnames}) VALUES (${selector}) RETURNING *`;
    try {
      const { rows } = await pg.query(queryString, values);
      return rows;
    } catch (error) {
      throw (error);
    }
  }

  static async select(table, column) {
    const queryString = `SELECT ${column} FROM ${table}`;
    try {
      const { rows } = await pg.query(queryString);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async selectWhere(table_name, select_list, condition, values) {
    const queryString = `SELECT ${select_list} FROM ${table_name} WHERE ${condition};`;
    try {
      const { rows } = await pg.query(queryString, values);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async update(table_name, columns, condition, values) {
    const queryString = `UPDATE ${table_name} SET ${columns} WHERE ${condition} returning *`;
    try {
      const { rows } = await pg.query(queryString, values);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async deleteWhere(table_name, condition, values) {
    const queryString = `DELETE FROM ${table_name} WHERE ${condition}`;
    try {
      const { rows } = await pg.query(queryString, values);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static hashPassword(password) {
    return bycrypt.hashSync(password);
  }

  static comparePassword(password, hash) {
    return bycrypt.compareSync(password, hash);
  }
}

export default Utils;
