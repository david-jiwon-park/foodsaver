const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const auth = require('../middleware/auth');

router.post('/signup', usersController.signUpUser); 
router.post('/login', usersController.loginUser); 
router.get('/:id', auth, usersController.getUser); 
router.put('/:id', auth, usersController.editUser); 
router.delete('/:id', auth, usersController.deleteUser); 

module.exports = router;