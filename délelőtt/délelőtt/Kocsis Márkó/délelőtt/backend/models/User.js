const mongoose = require('mongoose');


const UserSchema = new Schema({
  nev: { 
    type: String,
    require: true 
  },
  email: { 
    type: String, 
    require: true
  },
  jelszo: { 
    type: String, 
    require: true
  }
}, 
{ timestamps: true });

module.exports = mongoose.model('user', UserSchema);





