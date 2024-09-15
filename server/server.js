const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URL);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})


database.once('connected', () => {
  console.log('Database Connected');
});

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.json())
app.use(bodyParser.json());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

