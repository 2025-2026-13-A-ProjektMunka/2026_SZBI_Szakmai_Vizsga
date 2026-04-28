const Schedule = require('../../models/Schedule.js');

exports.getAllSchedulesFrontend = async (req, res) => {
    try {
        const schedules = await Schedule.find({});
        // console.log(schedules);
        
        res.statusCode = 200;
        return res.json({ schedules });
    } catch (error) {
        res.statusCode = 500;
        return res.json(error.message);
    }
};

exports.getOneScheduleFrontend = async (req, res) => {
    try {
        const { id } = req.params;
        const schedule = await Schedule.findById({ _id: id });
        res.statusCode = 200;
        return res.json({ schedule });
    } catch (error) {
        res.statusCode = 500;
        return res.json(error.message);
    }
};
