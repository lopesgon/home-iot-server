/**
 * Created by fredericlopesgoncalvesmagalhaes on 04.03.17.
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var RoomSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  // IS IT RELEVANT TO PUT A ROLE?
  role: [{
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  }],
  objects: [{
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
      required: true
    },
    checked: {
      type: Boolean,
      required: true
    }
  }]
});

RoomSchema.methods.updateStateObject = function(object, callback){
  for(var i=0; i<this.objects.length; i++){
    var current = this.objects[i];
    if(current.name == object.name){
      current.checked = object.checked;
      callback(true);
    }
  }
  callback(false);
};

module.exports = mongoose.model('Room', RoomSchema);