const Schedule = require('../models/Schedule.js');

exports.GetMain = (req, res) => {
    try {
        // const Trainers

        res.statusCode = 200;
        return res.render('index');
    }
    catch (error) {
        res.statusCode = 404;
        return res.render('404.ejs')
    }
}   