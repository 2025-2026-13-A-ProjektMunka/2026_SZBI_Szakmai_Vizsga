const mongoose = require('mongoose');


const CountrySchema = new Schema({
  nev: { 
    type: String,
    require: true 
  },
  terlulet: { 
    type: Number, 
    require: true
  },
  lakossag: { 
    type: Number, 
    require: true
  },
  fovaros: { 
    type: String, 
    require: true 
  },
  fovarosLakossag : { 
    type: Number, 
    require: true 
  },
  csatlakozas : { 
    type: Number, 
    require: true 
  },
  hivatalosNyelv : { 
    type: String, 
    require: true 
  },
  Zaszlo : { 
    type: text, 
    require: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('Country', CountrySchema);





