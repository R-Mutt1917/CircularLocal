require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const errorHandler = require("./middlewares/errorHandle.middleware");
const chatHandler = require('./sockets/chatHandler');

const app = express();

const httpServer = http.createServer(app);   // socket.io se monta sobre http, no sobre express

const io = new Server(httpServer, {
    cors: { origin: '*' }                      // en producción, limitar al dominio del front
});

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/index'));

chatHandler(io);

app.use(errorHandler);

module.exports = app;
