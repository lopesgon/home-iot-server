/**
 * Created by fredericlopesgoncalvesmagalhaes on 04.03.17.
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
*/


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var EventSchema = new Schema({
  filename: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    required: true
  },
  contentType: String,
  length: Number,
  chunkSize: Number,
  md5: String
});

EventSchema.pre('save', function(next){
  console.log("SMTH TO DO BEFORE SAVING EVENT");
  next();
});

module.exports = mongoose.model('Event', EventSchema);