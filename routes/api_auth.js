/**
 * Created by fredericlopesgoncalvesmagalhaes
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
*/
var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../app/models/user');
var jwt = require('jwt-simple');
var config = require('../config/database');

/**
 * API to authenticate a user and sending back a JSON Web Token (JWT) if authentication success.
 */
router.post('/', function(req, res) {
  console.log("authenticate API requested");
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.send({success: false, msg: 'Authentication failed'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.json({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
})

/*
TO DELETE - FOR CREATING NEW USERS FOR TESTING PURPOSE
USERS SHOULD BE CREATED ONLY IN LOCAL NETWORK, AVOID OUTSIDERS TO HAVE AN ACCESS
*/
.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    });

    // save the user
    newUser.save(function(err) {
      if (err) {
        console.log(err);
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

module.exports = router;