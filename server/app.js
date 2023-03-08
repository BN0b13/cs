require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.disable('x-powered-by');

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(port, 
  () => console.log('Listening on port: ', port));