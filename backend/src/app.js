require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDB } = require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());

initDB();

app.use('/api', require('./routes/index'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
