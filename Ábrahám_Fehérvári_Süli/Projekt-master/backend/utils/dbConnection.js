const mongoose = require('mongoose');

const dbConnection = async () => {
    const csatlakozas = await mongoose.connect(process.env.DBSTRING);
};

module.exports = dbConnection;