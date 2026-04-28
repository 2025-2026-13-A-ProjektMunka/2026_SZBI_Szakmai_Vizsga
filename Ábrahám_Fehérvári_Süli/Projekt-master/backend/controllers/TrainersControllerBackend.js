// --- Quateres edzők3 ---
const Trainer = require('../models/Trainer');

exports.getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find({});
        return res.render('trainers.ejs', { trainers });
    } catch (err) {
        res.status(500).json({
            message: 'Hiba az edzők lekérésekor',
            error: err.message,
        });
    }
};

exports.getTrainerById = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id).lean();
        if (!trainer)
            return res.status(404).json({ message: 'Edző nem található' });
        res.render('trainer.ejs', { trainer });
    } catch (err) {
        res.status(500).json({
            message: 'Hiba az edző lekérésekor',
            error: err.message,
        });
    }
};

exports.createTrainer = async (req, res) => {
    try {
        const { name, email, passwordHash, role } = req.body;
        const trainer = new Trainer({ name, email, passwordHash, role });
        await trainer.save();
        res.status(201).json(trainer);
    } catch (err) {
        res.status(400).json({
            message: 'Hiba az edző létrehozásakor',
            error: err.message,
        });
    }
};

exports.updateTrainer = async (req, res) => {
    try {
        const updated = await Trainer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).lean();
        if (!updated)
            return res
                .status(404)
                .json({ message: 'Felhasználó nem található' });
        res.json({msg: 'Sikeres módosítás!'});
    } catch (err) {
        res.status(400).json({
            message: 'Hiba az edző frissítésekor',
            error: err.message,
        });
    }
};

exports.deleteTrainer = async (req, res) => {
    try {
        const removed = await Trainer.findByIdAndDelete(req.params.id).lean();
        if (!removed)
            return res
                .status(404)
                .json({ message: 'Felhasználó nem található' });
        res.json({ msg: 'Törölve' });
    } catch (err) {
        res.status(500).json({
            message: 'Hiba az edző törlésekor',
            error: err.message,
        });
    }
};
