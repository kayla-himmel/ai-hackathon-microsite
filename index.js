require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(8080, () => {
  console.log(`App listening on port ${process.env.PORT}!`);
});
