require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require("./middlewares/errorHandle.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/index'));

app.use(errorHandler);

module.exports = app;
