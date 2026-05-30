const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(cors());
app.use(bodyParser());
app.use(express.json());
const app = express();

const PORT = process.env.PORT || 3800;

app.get('/', (req, res) => {

res.send('Üdvözöl a backend oldal.');
});
app.listen(PORT, () => 
{
console.log(`A szerver a következő porton fut:${PORT}`);
});