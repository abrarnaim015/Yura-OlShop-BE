const {db} = require('../config/mongo');
const {ObjectID} = require('mongodb');
const {verifyToken} = require('../helpers/jwt');

const users = db.collection('Users');
const pets = db.collection('Pets');

class Auth {
  static async authentication(req, next) {
    try {
      const {accessToken} = req.headers;
      if (!accessToken) {
        throw new Error({status: 401, message: 'Authentication Failed'});
      } else {
        const decode = verifyToken(accessToken);
        const user = await users.findOne({
          email: decode.email,
        });
        if (!user) {
          throw new Error({status: 401, message: 'Authentication Failed'});
        } else {
          req.userLoggedIn = decode;
          next();
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async authorization(req, next) {
    try {
      const id = req.params.id;
      const userId = req.userLoggedIn._id;
      const pet = await pets.findOne({
        _id: ObjectID(id),
      });
      if (!pet) {
        throw new Error({status: 404, message: 'Pet is not found'});
      } else if (pet.userId.toString() !== userId.toString()) {
        throw new Error({status: 401, message: 'Not Authorized'});
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  }
};


module.exports = Auth;
