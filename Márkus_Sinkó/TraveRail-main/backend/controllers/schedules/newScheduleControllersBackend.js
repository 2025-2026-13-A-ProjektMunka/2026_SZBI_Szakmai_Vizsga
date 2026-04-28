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

exports.getNewSchedule = (req, res) => {
    try {
        res.statusCode = 200;
        return res.render('new-schedule.ejs', {
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
        res.statusCode = 404;
        return res.render('404.ejs');
    }
};

exports.postNewSchedule = async (req, res) => {
    try {
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
        // console.log({
        //   jarat,
        //   induloallomas,
        //   celallomas,
        //   allomasok,
        //   kedvezmeny,
        //   kortablak,
        //   idotartam,
        //   idopontok,
        //   klima,
        //   helyjegy,
        //   kepek,
        // });

        const newSchedule = new Schedule({
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
        });
        console.log(newSchedule);

        await newSchedule.save();

        res.statusCode = 201;
        return res.json({ msg: 'Sikeres feltöltés!' });
    } catch (error) {
        res.statusCode = 500;
        return res.json({ msg: 'Valami hiba!' + error.message });
    }
};
