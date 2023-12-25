const pool = require('../db-config');
const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');

dotenv.config();

const app = express();

const port = process.env.PORT || 5432;


app.get('/', (req, res) => {
  res.send('Hello, this is a simple GET request!');
});



app.listen(5432, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });