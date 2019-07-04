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
}

export default Utils;
