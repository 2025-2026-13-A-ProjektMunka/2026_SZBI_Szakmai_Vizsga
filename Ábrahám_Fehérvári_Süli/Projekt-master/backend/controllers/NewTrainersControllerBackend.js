const Trainer = require('../models/Trainer');
// const { zsanerek, kedvezmenyek } = require('../public/js/adatok');

exports.getNewTrainersBackend = (req, res) => {
    try {
        res.statusCode = 200;
        return res.render('new-trainers.ejs');
    } catch (error) {
        res.statusCode = 500;
        return res.render('404.ejs');
    }
};

exports.postNewTrainersBackend = async (req, res) => {
    try {
        const { nev, elerhetoseg, specialization, experience, ar, kep } =
            req.body;

        const newTrainer = new Trainer({
            nev,
            elerhetoseg,
            specialization,
            experience,
            ar,
            kep,
        });

        console.log(newTrainer);

        await newTrainer.save();

        res.statusCode = 201;
        return res.json({ msg: 'Sikeres feltöltés!' });
    } catch (error) {
        res.statusCode = 500;
        return res.json({ msg: 'Valami hiba történt!' + error.message });
    }
};
