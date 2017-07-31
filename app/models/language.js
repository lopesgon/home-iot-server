/**
 * Created by fredericlopesgoncalvesmagalhaes on 04.03.17.
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
*/


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var LanguageSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model('Language', LanguageSchema);