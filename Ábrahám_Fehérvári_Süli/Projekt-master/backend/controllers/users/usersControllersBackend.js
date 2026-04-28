const User = require('../../models/User.js');

const getAllUsersBackend = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).render('users/users.ejs', { users });
    } catch (error) {
        res.status(404).render('404.ejs');
    }
};

const updateOneUserBackend = async (req, res) => {
    try {
        const { id, nev, email, admin } = req.body;
        await User.findByIdAndUpdate(id, { nev, email, admin });
        res.status(201).json({ msg: 'Sikeres módosítás!' });
    } catch (error) {
        res.status(500).json({ msg: 'Valami hiba! ' + error.message });
    }
};

const deleteOneUserBackend = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ msg: 'Sikeres törlés!' });
    } catch (error) {
        res.status(500).json({ msg: 'Valami hiba történt! ' + error.message });
    }
};

module.exports = {
    getAllUsersBackend,
    updateOneUserBackend,
    deleteOneUserBackend
};