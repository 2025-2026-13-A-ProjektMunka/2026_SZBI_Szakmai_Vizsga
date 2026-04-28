const User = require('../models/User.js');
// backend/controllers/UserControllerBackend.js
const Trainer = require('../models/Trainers.js');
const Gymsplit = require('../models/Gymsplit.js');

// Felhasználók
exports.getAllUsersBackend = async (req, res) => {
    try {
        const users = await User.find().lean();
        res.json(users);
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
