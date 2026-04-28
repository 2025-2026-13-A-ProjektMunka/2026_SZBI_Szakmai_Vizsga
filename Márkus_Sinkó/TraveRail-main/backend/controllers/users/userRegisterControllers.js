const User = require("../../models/User.js");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { keresztNev,
      vezetekNev,
      email,
      jelszo, } = req.body;

    const users = await User.find({});
    console.log({ keresztNev,
      vezetekNev,
      email,
      jelszo, });
    

    const letezoUser = users.filter((elem) => elem.email === email);

    if (letezoUser.length !== 0) {
      throw new Error("Ezzel az e-mail címmel már regisztráltak!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(jelszo, salt);

    const newUser = new User({ keresztNev,
      vezetekNev,
      email, jelszo: hashedPassword });

      console.log(newUser);
      
    await newUser.save();

    res.statusCode = 201;
    return res.json({ msg: "Sikeres regisztráció!" });
  } catch (error) {
    res.statusCode = 500;
    return res.json({ msg: "Valami hiba: " + error.message });
  }
};

module.exports = { registerUser };
