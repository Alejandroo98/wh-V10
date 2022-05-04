const express = require('express');
const app = express();
const path = require('path');

const { getCitasManana } = require('../helpers/getcitasmanana');

// router.use('/qr', getQr);

app.set('views', path.join(__dirname, '../public'));

app.get('/', async (req, res) => {
  const citasManana = await getCitasManana();
  const total = citasManana.length;
  res.render('index', { citasManana, total });
});

module.exports = app;
