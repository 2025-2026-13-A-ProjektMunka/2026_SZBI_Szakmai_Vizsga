const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'trainer' },
        idopont: {
            type: 'String',
            required: true
        }
    },
    { timestamps: true }
);

const ReservationModel = mongoose.model('reservation', reservationSchema);

module.exports = ReservationModel;