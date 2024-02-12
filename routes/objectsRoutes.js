const express = require('express');
const objectController = require('../controllers/objectsController');

const router = express.Router();

// Route to fetch an object by its ID
router.get('/:id', objectController.fetchObjectById);

// Route to fetch all objects
router.get('/', objectController.fetchAllObjects);

// Route to create a new object
router.post('/', objectController.createObject);

// Route to update an object by its ID
router.put('/:id', objectController.updateObjectById);

// Route to delete an object by its ID
router.delete('/:id', objectController.deleteObjectById);

module.exports = router;
