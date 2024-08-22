require('dotenv/config');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.disable('x-powered-by');

//Import Routes
const routes = require('./routes');
app.use('/', routes);

app.listen(process.env.PORT, console.log('Listening on port: ', process.env.PORT));