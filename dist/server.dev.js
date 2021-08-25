"use strict";

var cookieParser = require('cookie-parser');

var path = require('path');

var pathToFile = path.resolve(__dirname, './public');

var express = require('express');

var app = express();
var port = process.env.PORT || 5555;
app.use(express.json());
app.use(express["static"](pathToFile));
app.use(cookieParser());

var userRoutes = require('./routes/dist/userRoutes');

var storeRoutes = require('./routes/dist/storeRoutes'); // import * as userRoutes from './routes/userRoutes';


app.use('/user', userRoutes);
app.use('/store', storeRoutes);
app.listen(port, function () {
  console.log("Listening on port: ".concat(port));
});