const User = require("../../models/User.js");

const getAllUsersBackend = async (req, res) => {
  try {
    const users = await User.find({});
    res.statusCode = 200;
    return res.render("users/users.ejs", { users });
  } catch (error) {
    res.statusCode = 404;
    return res.render("404.ejs");
  }
};

const updateOneUserBackend = async (req, res) => {
  try {
    const { id, nev, email, admin } = req.body;
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { nev, email, admin }
    );

    res.statusCode = 201;
    return res.json({ msg: "Sikeres módosítás!" });
  } catch (error) {
    res.statusCode = 500;
    return res.json({ msg: "Valami hiba!" + error.message });
  }
};

const deleteOneUserBackend = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete({ _id: id });
    res.statusCode = 200;
    return res.json({ msg: "Sikeres törlés!" });
  } catch (error) {
    res.statusCode = 500;
    return res.json({ msg: "Valami hiba történt!" + error.message });
  }
};

module.exports = {
  getAllUsersBackend,
  updateOneUserBackend,
  deleteOneUserBackend,
};
