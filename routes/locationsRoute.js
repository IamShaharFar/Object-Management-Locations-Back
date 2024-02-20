const express = require('express');
const locationsControllers = require('../controllers/locationsControllers');

const router = express.Router();

router.post('/start' , locationsControllers.start);
router.post('/stop' , locationsControllers.stop);
router.post('/push', locationsControllers.pushOut);

module.exports = router;