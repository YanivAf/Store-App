var path = require('path');
var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
var port = process.env.PORT || 5555;
var pathToFile = path.resolve(__dirname, './public');
app.use(express.json());
app.use(express.static(pathToFile));
app.use(cookieParser());
var exampleRoutes = require('./routes/exampleRoutes');
app.use('/example', exampleRoutes);
app.listen(port, function () { console.log("Listening on port: " + port); });
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;
// app.get('/',(req, res)=>{
//     res.send('<h1>I am alive!!!!!</h1>')
// })
// app.listen(port, ()=>{
//     console.log('app listen on port' , port)
// });
