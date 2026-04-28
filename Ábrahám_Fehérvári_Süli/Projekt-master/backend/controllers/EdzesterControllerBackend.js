// --- Edzestervel ---
exports.getAllGymsplits = async (req, res) => {
  try {
    const splits = await Gymsplit.find().populate('trainer').lean();
    res.json(splits);
  } catch (err) {
    res.status(500).json({ message: 'Hiba a split-ek lekérésekor', error: err.message });
  }
};

exports.createGymsplit = async (req, res) => {
  try {
    const s = new Gymsplit(req.body);
    await s.save();
    res.status(201).json(s);
  } catch (err) {
    res.status(400).json({ message: 'Hiba a split létrehozásakor', error: err.message });
  }
};


exports.getAllUsersBackend = async (req, res) => {
    try {
        const usersBackend = await User.find();
        res.statusCode = 200;
        return res.render("Users.ejs", { usersBackend });
    } catch (error) {
        res.statusCode = 404;
        return res.render("404.ejs");
    }
};

exports.getOneUserBackend = async (req, res) => {
    try {
        const { id } = req.params;
        const userBackend = await User.findById({ _id: id });
        res.statusCode = 200;
        return res.render("User.ejs", { userBackend });
    } catch (error) {
        res.statusCode = 404;
        return res.render("404.ejs");
    }
};

exports.postUserBackend = async (req, res) => {
    try {
        const { nev, statusz } = req.body;
        const newUserBackend = new User({ nev, statusz });
        await newUserBackend.save();
        res.statusCode = 201;
        return res.json({ msg: 'Létre jött az új felhasználó!' });
    } catch (error) {
        res.statusCode = 409;
        return res.json({ msg: 'Nem jött létre az új felhasználó!' });
    }
};

exports.updateOneUserBackend = async (req, res) => {
    try {
        const { id } = req.params;
        const { nev, statusz } = req.body;
        await User.findByIdAndUpdate({ _id: id }, { nev, statusz });
        res.statusCode = 201;
        return res.json({ msg: 'Sikeres módosítás!' });
    } catch (error) {
        res.statusCode = 404;
        return res.json({ msg: 'Valami hiba történt!' });
    }
};

exports.deleteOneUserBackend = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete({ _id: id });
        res.statusCode = 200;
        return res.json({ msg: 'Sikeres törlés!' });
    } catch (error) {
        res.statusCode = 409;
        return res.json({ msg: 'Valami hiba történt!' });
    }
};