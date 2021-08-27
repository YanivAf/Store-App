const cookieParser = require('cookie-parser');

const path = require('path');
const pathToFile = path.resolve(__dirname, './public');

const express = require('express');
const app = express();

const port = process.env.PORT || 555;

app.use(express.json());
app.use(express.static(pathToFile));
app.use(cookieParser());

const userRoutes = require('./routes/dist/userRoutes');
const storeRoutes = require('./routes/dist/storeRoutes');
// import * as userRoutes from './routes/userRoutes';

app.use('/user', userRoutes);
app.use('/store', storeRoutes);

app.listen(port, () => { console.log(`Listening on port: ${port}`); });