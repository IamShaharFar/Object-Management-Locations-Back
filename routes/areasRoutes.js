const express = require('express');
const areaController = require('../controllers/areasContoller');

const router = express.Router();

router.get('/fetchByUserId', areaController.fetchAreasByUserId);
router.get('/:id', areaController.fetchAreaById);
router.get('/', areaController.fetchAllAreas);
router.post('/', areaController.createArea);
router.put('/:id', areaController.updateAreaById);
router.delete('/:id', areaController.deleteAreaById);

module.exports = router;