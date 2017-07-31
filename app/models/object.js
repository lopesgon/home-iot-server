/**
 * Created by fredericlopesgoncalvesmagalhaes on 04.03.17.
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var ObjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gpio: {
    type: Number,
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} is not an integer value'
    },
    require: true,
    unique: true
  },
  checked: Boolean

});

module.exports = mongoose.model('Object', ObjectSchema);