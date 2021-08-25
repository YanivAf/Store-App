const cookieParser = require('cookie-parser');

const path = require('path');
const pathToFile = path.resolve(__dirname, './public');

const express = require('express');
const app = express();

const port = process.env.PORT || 5555;

app.use(express.json());
app.use(express.static(pathToFile));
app.use(cookieParser());

const userRoutes = require('./routes/dist/userRoutes');
// import * as userRoutes from './routes/userRoutes';

app.use('/user', userRoutes);

app.listen(port, () => { console.log(`Listening on port: ${port}`); });