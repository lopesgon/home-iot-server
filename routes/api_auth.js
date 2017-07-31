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

/*
TO DELETE - FOR CREATING NEW USERS FOR TESTING PURPOSE
USERS SHOULD BE CREATED ONLY IN LOCAL NETWORK OR FROM TERMINAL COMMAND
*/
router.post('/authenticate', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({success: false, msg: 'FOR TESTING: Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'FOR TESTING: Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

/*
.post('/signup', function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password
    });

    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'TO CHANGE: Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
})
*/

module.exports = router;