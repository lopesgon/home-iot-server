/**
 * Created by fredericlopesgoncalvesmagalhaes on 04.03.17.
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// set up a mongoose model
var UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  /* // SHOULD BE ADDED WITH A NEW STEP in comparePassword()
  salt: {
    type: String,
    require: true
  },
  */

  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  },
  settings: {
    language: {
      type: Schema.Types.ObjectId,
      ref: 'Language',
      required: true
    },
    customNumbers: [{
      name: {
        type: String,
        required: true
      },
      number: {
        type: String,
        require: true,
        unique: true
      }
    }]
  }

});

UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (passw, cb) {
  // var passwHashed = bcrypt.hash(passw, this.salt);
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);