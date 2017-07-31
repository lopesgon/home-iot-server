/**
 * Created by fredericlopesgoncalvesmagalhaes
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
 */
var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req,res) {
  res.render('layout');
})
.get('*', passport.authenticate('jwt', {session: false}), function(req, res){
  res.render('layout');
});

module.exports = router;