const express = require('express');
const userController = require('../controllers/usersControllers');

const router = express.Router();

router.get('/:id', userController.fetchUserById);
router.get('/', userController.fetchAllUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUserById); 
router.delete('/:id', userController.deleteUserById);

module.exports = router;
