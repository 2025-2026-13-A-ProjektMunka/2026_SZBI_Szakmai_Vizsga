const Trainer = require('../models/Trainer.js');
const User = require('../models/User.js');
const Reservation = require('../models/Reservation.js');

exports.updateIdopont = async (req, res) => {
    try {
        const { id } = req.params;
        const { userid, selectedDate, selectedTime } = req.body;
        console.log({ id, userid, selectedDate, selectedTime });
        const trainer = await Trainer.findById({ _id: id });
        const user = await User.findById({ _id: userid });
        console.log(trainer);

        await Trainer.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    foglalt: [
                        ...trainer.foglalt,
                        `${selectedDate},${selectedTime}`,
                    ],
                },
            }
        );

        const newReservation = new Reservation({user, trainer, idopont: `${selectedDate},${selectedTime}`});
        await newReservation.save();

        console.log([...trainer.foglalt, `${selectedDate},${selectedTime}`]);

        res.statusCode = 201;
        return res.json({ msg: 'Sikeres időpont foglalás!' });
    } catch (error) {
        res.statusCode = 500;
        return res.json({ msg: 'Valami hiba!' });
    }
};

// ÚJ FUNKCIÓ: Időpont Lemondása
exports.cancelIdopont = async (req, res) => {
    try {
        const { reservationId } = req.params;
        
        // 1. Foglalás megkeresése
        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            res.statusCode = 404;
            return res.json({ msg: 'A foglalás nem található!' });
        }

        const trainerId = reservation.trainer._id;
        const canceledIdopont = reservation.idopont;

        // 2. Edző frissítése: Eltávolítjuk a foglalt időpontot
        await Trainer.findByIdAndUpdate(
            trainerId,
            { 
                $pull: { foglalt: canceledIdopont } 
            },
            { new: true } // Visszaadja az új dokumentumot (nem feltétlenül szükséges, de jó gyakorlat)
        );

        // 3. Foglalás törlése
        await Reservation.findByIdAndDelete(reservationId);

        console.log(`Sikeresen lemondva: Trainer ID: ${trainerId}, Időpont: ${canceledIdopont}`);

        res.statusCode = 200;
        return res.json({ msg: 'Sikeres időpont lemondás!', canceledIdopont });
    } catch (error) {
        console.error('Hiba az időpont lemondásakor:', error);
        res.statusCode = 500;
        return res.json({ msg: 'Valami hiba történt az időpont lemondása közben!' });
    }
};