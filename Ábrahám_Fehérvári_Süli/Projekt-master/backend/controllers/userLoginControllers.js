const User = require('../models/User.js');
const bcrypt = require('bcrypt');

exports.loginUser = async (req, res) => {
    try {
        const { email, jelszo } = req.body;
        console.log({ email, jelszo });

        // Közvetlenül az emailre keresünk, nem kell minden felhasználót lekérni
        const letezoUser = await User.findOne({ email });

        if (!letezoUser) {
            return res.status(404).json({ msg: 'Ezzel az e-mail címmel nem létezik felhasználó!' });
        }

        const hasonlit = await bcrypt.compare(jelszo, letezoUser.jelszo);

        if (hasonlit) {
            return res.status(200).json({ msg: 'Üdvözlünk az oldalunkon!', letezoUser });
        } else {
            return res.status(401).json({ msg: 'Ezzel a jelszóval nem létezik felhasználó!' });
        }

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
