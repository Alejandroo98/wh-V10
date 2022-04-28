const express = require('express');
const router = express.Router();
const { getQr } = require('../helpers/web');

router.use('/qr', getQr);

module.exports = router;
