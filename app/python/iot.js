/**
 * Created by fredericlopesgoncalvesmagalhaes on 24.01.17.
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
 */

var pythonShell = require("python-shell");

function launch (shell, args, callback) {
  shell.send(JSON.stringify(args));

  shell.on('message', function (msg) {
    console.log("Python Message: " + msg);
  });

  // end the input stream and allow the process to exit
  shell.end(function (err) {
    if (err) {
      callback(err);
    }
    callback();
  });

}

module.exports = {

  objectAction : function(args, callback) {
    console.log("START: Python objectAction");
    console.log("UNCOMMENT ON RASPBERRY PI");

    var pathPythonScript = "../app/python/gpioUpdate.py";
    launch(new pythonShell(pathPythonScript), args, function(err){
      if(err){
        callback(false)
      }
      console.log('END: Python objectAction');
      callback(true)
    });
  },

  pirMotionDetection: function(args, callback){
    console.log("START: Python pir_motion.py script");
    var path = "../app/python/pir_motion.py";
    launch(new pythonShell(path), args, function(err){
      if(err){
        callback(false);
      }
      console.log("END: Python pir_motion.py");
      callback(true);
    })
  },

  gpioState: function(args, callback){
    console.log('START: Python gpioState');
    console.log("UNCOMMENT ON RASPBERRY PI");
    callback(true);
    /*
    var pathPythonScript = "./gpioCheck.py";
    launch(new pythonShell(pathPythonScript), args, function(err){
      if(err){
        callback(false)
      }
      console.log('END: Python gpioState');
      callback(true)
    });
    */
  },

  faceRecognition : function(args){
    console.log("TODO: LANCEMENT DU SCRIPT POUR RECONNAISSANCE FACIALE")
  }

};