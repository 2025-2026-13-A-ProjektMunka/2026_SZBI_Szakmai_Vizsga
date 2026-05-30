const dotenv = require ('dotenv');
dotenv.config();

const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
const PORT = process.env.PORT || 3800;
const app = express();

app.use (express.json());
app.use (cors());


try {
    await mongoose.connect(process.env.MONGODB_STRING);
    console.log('Sikeres csatalkozas');

    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    })
} catch (error) {
    console.error(`valami baj van:${error.message}`);
};

dbConnection();
