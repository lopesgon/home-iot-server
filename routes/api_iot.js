/**
 * Created by fredericlopesgoncalvesmagalhaes
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
 */
var express = require('express');
var router = express.Router();
var Room = require('../app/models/room');

router.post('/rooms', function(req, res){
  Room.find({}, function(err, rooms) {
    if(err) throw err;
    res.json({success: true, rooms: rooms});
  });
});

/*
.post('/rooms/:idRoom/objects', function(req, res) {
  console.log("post('/rooms/:idRoom) --> value : " + req.params.idRoom);
  Room.find({_id: req.params.idRoom}, function(err, room){
    if(err) throw err;

    var objs = room.objects;
    for(var i=0; i<objs.length; i++){

    }
  });
  return res.json({success: false, msg: 'Error getting objects.'});
});
*/

module.exports = router;