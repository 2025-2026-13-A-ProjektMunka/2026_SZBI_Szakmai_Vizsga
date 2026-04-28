const Schedule = require('../../models/Schedule.js');

exports.getAllSchedulesBackend = async (req, res) => {
    try {
        const schedules = await Schedule.find({});
        res.statusCode = 200;
        return res.render('schedules.ejs', { schedules });
    } catch (error) {
        res.statusCode = 404;
        return res.render('404.ejs');
    }
};

exports.getOneScheduleBackend = async (req, res) => {
    try {
        const { id } = req.params;
        const schedule = await Schedule.findById({ _id: id });
        res.statusCode = 200;
        return res.render('schedules/schedule.ejs', { schedule });
    } catch (error) {
        res.statusCode = 404;
        return res.render('404.ejs');
    }
};

exports.deleteOneScheduleBackend = async (req, res) => {
    try {
        const { id } = req.params;

        await Schedule.findByIdAndDelete({ _id: id });
        res.statusCode = 200;
        return res.json({ msg: 'Sikeres törlés!' });
    } catch (error) {
        res.statusCode = 500;
        return res.json({ msg: 'Valami hiba történt!' + error.message });
    }
};
