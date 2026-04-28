const User = require('../models/User.js');
const Reservation = require('../models/Reservation.js');
const Gymsplit = require('../models/Gymsplit.js');

// Felhasználók
exports.getAllUsersBackend = async (req, res) => {
    try {
        const users = await User.find({});
        const reservations = await Reservation.find({})
            .populate('user')
            .populate('trainer');
        console.log(users);
        console.log(reservations);

        return res.render('users/users.ejs', { users, reservations });
    } catch (err) {
        res.status(500).json({
            message: 'Hiba a felhasználók lekérésekor',
            error: err.message,
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean();
        if (!user)
            return res
                .status(404)
                .json({ message: 'Felhasználó nem található' });
        res.json(user);
    } catch (err) {
        res.status(500).json({
            message: 'Hiba a felhasználó lekérésekor',
            error: err.message,
        });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, passwordHash, role } = req.body;
        const user = new User({ name, email, passwordHash, role });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({
            message: 'Hiba a felhasználó létrehozásakor',
            error: err.message,
        });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { admin } = req.body;

    console.log({ admin });
    
    try {
        const updated = await User.findByIdAndUpdate({ _id: id }, { $set: { admin: admin } });
        console.log(updated);
        
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

exports.deleteReservation = async (req, res) => {
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
