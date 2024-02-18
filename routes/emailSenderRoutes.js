const express = require('express');
const emailSenderController = require('../controllers/emailSenderController');

const router = express.Router();

router.post('/send', emailSenderController.sendEmailRoute);
router.post('/message', emailSenderController.sendWhatsAppRoute);

module.exports = router;