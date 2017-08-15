/**
 * Created by fredericlopesgoncalvesmagalhaes
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
 */
var express = require('express');
var router = express.Router();
var Event = require('../app/models/event');

var mongoose = require('mongoose');
var conn = mongoose.connection;

var passport = require('passport');
var fs = require("fs");
var path = require("path");
var Grid = require("gridfs-stream");

// connect GridFS and mongo
Grid.mongo = mongoose.mongo;
var gfs = Grid(conn.db);

// var Event = require('../app/models/event');

router.get('/', function(req, res){
  gfs.files.find({}).toArray(function(err, files){
    if(err) {
      var head = {
        'X-error-message' : 'Internal server error'
      };
      res.writeHead(500, head);
      res.send();
    }
    res.json({success: true, events: files});
  });
})
.get('/:id', function(req, res){
  console.log('router/api_events/:id : get events');
  var id = 0;
  if(req.params.id){
      id = req.params.id;
  }
  console.log("router/api_events/:id : ID received to do infinite scroll: " + id);

  gfs.files.find({}).toArray(function(err, files){
      if(err) console.log(err);
      res.json({success: true, events: files});
  });

  /*
   var lastId = req.body.id;
   gfs.files.find().sort({uploadDate:-1}).limit(10).toArray(function(err, files){
   if(err) next(err);
   res.send({success: true, events: files});
   });
   */

})
.post('/delete', function(req, res, next){
  options = {
    _id: req.body.fileId
  };

  gfs.exist(options, function (err, found) {
    if (err) return next(err);

    if (found) {
      gfs.remove(options, function(err){
        //console.log("Error occured while deleting stream: " + err);
      });
      res.json({success: true, msg:"Document deleted successfuly."});
    }else{
      console.log("routes/api_events/delete : File doesn't exist.");
      res.json({success: false, msg:"Fail to delete document."});
    }
  });
})
.get('/video/:id', function(req, res, next){
  var options = {
    _id: req.params.id,
    range: {
      startPos: null,
      endPos: null
    }
  };
  gfs.findOne({_id: options._id}, function(err, file){
    if(err){
      next(err);
    }

    var range = req.headers.range;

    if (!range) {
      var err = new Error("Wrong range");
      err.status = 416;
      //	->	Send the error and stop the request.
      return next(err);
    }

    //	4.	Convert the string range in to an array for easy use.
    var positions = range.replace(/bytes=/, "").split("-");

    //	5.	Convert the start value in to an integer
    var start = parseInt(positions[0], 10);

    var file_size = file.length;

    var end = positions[1] ? parseInt(positions[1], 10) : file_size - 1;

    //	8.	Calculate the amount of bits will be sent back to the browser.
    var chunksize = (end - start) + 1;

    //	9.	Create the header for the video tag so it knows what is receiving.
    var head = {
      "Content-Range": "bytes " + start + "-" + end + "/" + file_size,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4"
    };

    res.writeHead(206, head);

    options.range.startPos = start;
    options.range.endPos = end;

    //	12.	Create a stream chunk based on what the browser asked us for
    var stream = gfs.createReadStream(options);

    stream.pipe(res);

    stream.on("error", function (err) {
      return next(err);
    });
  });
})
.get('/image/:id', function(req,res,next){
  var options = {
    _id: req.params.id
  };
  gfs.exist(options, function(err, found){
    if(err) next(err);
    if(found){

      res.writeHead(200, {
        'Content-Type': 'image/jpeg'
      });

      var stream = gfs.createReadStream(options);
      stream.pipe(res);

      stream.on("error", function(err){
        return next(err);
      });
    }else{
      console.log("router/api_events/image/:id : IMG DOESNT EXIST");
      res.json({succes:false, msg:"FILE DOESNT EXIST"});
    }
  });
});

module.exports = router;