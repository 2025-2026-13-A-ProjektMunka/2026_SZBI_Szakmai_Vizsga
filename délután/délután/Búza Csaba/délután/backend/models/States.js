const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema(
    {
  nev: 
        { 
          type: String, 
          required: true 
        },
  terulet: 
        { 
          type: Number, 
          required: true 
        },
  lakossag: 
        { type: Number,
          required: true 
        },
  fovaros: 
        { 
          type: String,
          required: true 
        },
  fovarosLakossag:
        {
            type: Number, 
            required: true
        },
  csatlakozas: 
        {
            type: Number, 
            required: true 
        },
  haderoNagysaga:
        {   
            type: Number, 
            required: true 
        },
  zaszlo: 
        {   type: String, 
            required: true 
        }
});

module.exports = mongoose.model('State', StateSchema);
