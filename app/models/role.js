/**
 * Created by fredericlopesgoncalvesmagalhaes on 04.03.17.
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var RoleSchema = new Schema({
  type: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model('Role', RoleSchema);