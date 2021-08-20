const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 5555;
const pathToFile = path.resolve(__dirname, './public');

app.use(express.json());
app.use(express.static(pathToFile));
app.use(cookieParser());

const exampleRoutes = require('./routes/exampleRoutes');

app.use('/example', exampleRoutes);

app.listen(port, () => { console.log(`Listening on port: ${port}`) });


// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;

// app.get('/',(req, res)=>{
//     res.send('<h1>I am alive!!!!!</h1>')
// })

// app.listen(port, ()=>{
//     console.log('app listen on port' , port)
// });
