import Utils from '../utils/utils';

const { errResponse, selectWhere } = Utils;

class IsAdmin {
  static async checkIfAdmin(req, res, next) {
    const admin = req.body.is_admin;
    const { user_id } = req.body;
    const row = await selectWhere('users', 'is_admin', 'id=$1', [user_id]);
    if (!row.length) {
      return errResponse(res, 404, 'there is no user with such user id');
    }
    const userIdAdminStatus = row[0].is_admin;
    if (!userIdAdminStatus) {
      return errResponse(res, 403, 'user with supplied user_id is not an admin');
    }
    if (admin.toLowerCase() === 'true') {
      return next();
    }
    return errResponse(res, 403, 'only admins can create a trip, you are an admin pls set is_admin to true');
  }
}

export default IsAdmin;
