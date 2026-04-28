const User = require('../models/User.js');
const Reservation = require('../models/Reservation.js');
const Gymsplit = require('../models/Gymsplit.js');

// Felhasználók
exports.getAllUsersFrontend = async (req, res) => {
    try {
        const users = await User.find({});
        const reservations = await Reservation.find({})
            .populate('user')
            .populate('trainer');
        // console.log(users);
        // console.log(reservations);

        return res.json({ users, reservations });
    } catch (err) {
        res.status(500).json({
            message: 'Hiba a felhasználók lekérésekor',
            error: err.message,
        });
    }
};

exports.getOneUserFrontend = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById({ _id: id });
        const reservations = await Reservation.find({})
            .populate('user')
            .populate('trainer');

        const reser = reservations.filter((elem) => elem.user._id === id);
        // console.log(reser);

        if (!user)
            return res
                .status(404)
                .json({ message: 'Felhasználó nem található' });
        return res.json({ reser });
    } catch (err) {
        res.status(500).json({
            message: 'Hiba a felhasználó lekérésekor',
            error: err.message,
        });
    }
};

exports.updateOneUserFrontend = async (req, res) => {
    try {
        const { id } = req.params;
        const { kep } = req.body;
        console.log(kep);
        
        
        const user = await User.findByIdAndUpdate({_id: id}, { $set: {avatar: kep}});
        console.log(user);
        
        res.status(201).json({msg: 'Sikeres frissítés!'});
    } catch (err) {
        res.status(400).json({
            message: 'Hiba a felhasználó létrehozásakor',
            error: err.message,
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).lean();
        if (!updated)
            return res
                .status(404)
                .json({ message: 'Felhasználó nem található' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({
            message: 'Hiba a felhasználó frissítésekor',
            error: err.message,
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const removed = await User.findByIdAndDelete(req.params.id).lean();
        if (!removed)
            return res
                .status(404)
                .json({ message: 'Felhasználó nem található' });
        res.json({ message: 'Törölve', removed });
    } catch (err) {
        res.status(500).json({
            message: 'Hiba a felhasználó törlésekor',
            error: err.message,
        });
    }
};
