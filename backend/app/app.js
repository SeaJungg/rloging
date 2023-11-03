require("dotenv").config();
const express = require('express');
const router = require('./routes');
const cors = require("cors");
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'your session secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

let corsOptions = {
    origin: `http://localhost:${process.env.PORT}`,
    credentials: true
  };
  

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(router);

app.listen(process.env.PORT, function() {
    console.log(`App listening on port ${process.env.PORT}!`);
});

const path = require('path');

app.get('/login-test', (req, res) => {
    const filePath = path.join(__dirname, 'test.html');
    return res.sendFile(filePath);
});
