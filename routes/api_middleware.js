/**
 * Created by fredericlopesgoncalvesmagalhaes
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
 */
var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var config = require('../config/database');
var User = require('../app/models/user');

router.use(function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({success: false, msg: 'Authentication failed.'});
      } else {
        next();
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }

});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;