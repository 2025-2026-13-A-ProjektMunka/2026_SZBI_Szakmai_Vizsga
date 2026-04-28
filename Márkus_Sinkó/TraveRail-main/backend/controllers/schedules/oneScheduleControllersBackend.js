const Schedule = require('../../models/Schedule.js');
const {
    jarat,
    allomasok,
    kedvezmeny,
    kortablak,
    idotartam,
    idopontok,
    induloallomas,
    celallomas,
    ar,
} = require('../../public/schedules/js/adatok.js');

exports.getOneScheduleBackend = async (req, res) => {
    try {
        const { id } = req.params;
        const schedule = await Schedule.findById({ _id: id });

        res.statusCode = 200;
        return res.render('schedule.ejs', {
            schedule,
            jarat,
            allomasok,
            kedvezmeny,
            kortablak,
            idotartam,
            idopontok,
            induloallomas,
            celallomas,
            ar,
        });
    } catch (error) {
        res.statusCode = 500;
        return res.json({ msg: 'Valami hiba!' + error.message });
    }
};

exports.updateOneScheduleBackend = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            jarat,
            induloallomas,
            celallomas,
            allomasok,
            kedvezmeny,
            kortablak,
            idotartam,
            idopontok,
            klima,
            helyjegy,
            kep1,
            kep2,
            ar,
        } = req.body;

        const kepek = [kep1, kep2];

        const schedule = await Schedule.findByIdAndUpdate(
            { _id: id },
            {
                jarat,
                induloallomas,
                celallomas,
                allomasok,
                kedvezmeny,
                kortablak,
                idotartam,
                idopontok,
                klima,
                helyjegy,
                kepek,
                ar,
            }
        );

        res.statusCode = 201;
        return res.json({ msg: 'Sikeres módosítás!' });
    } catch (error) {
        res.statusCode = 500;
        return res.json({ msg: 'Valami hiba!' + error.message });
    }
};
