/**
 * Created by fredericlopesgoncalvesmagalhaes on 28.04.17.
 */
var five = require('johnny-five');
var board = new five.Board();

var ready = function(pin){
  board.on('ready', function(){
    var motion = new five.Motion(pin);

    motion.on("calibrated", function() {
      console.log("calibrated");
    });

    // "motionstart" events are fired when the "calibrated"
    // proximal area is disrupted, generally by some form of movement
    motion.on("motionstart", function() {
      console.log("motionstart");
    });

    // "motionend" events are fired following a "motionstart" event
    // when no movement has occurred in X ms
    motion.on("motionend", function() {
      console.log("motionend");
    });

  });
};

module.exports = {
  start: function(pin){
    ready(pin);
  }
};