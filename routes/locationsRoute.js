const express = require('express');
const locationsControllers = require('../controllers/locationsControllers');

const router = express.Router();

router.post('/start' , locationsControllers.start);
router.post('/stop' , locationsControllers.stop);

module.exports = router;