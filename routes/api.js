const express = require('express');
const router = express.Router();
const { sendMessagePost } = require('../helpers/web');

router.post('/send', sendMessagePost);

module.exports = router;
