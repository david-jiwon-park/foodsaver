const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const auth = require('../middleware/auth');

router.post('/signup', usersController.signUpUser); 
router.post('/login', usersController.loginUser); 
router.get('/', auth, usersController.getUser); 
router.put('/', auth, usersController.editUser); 
router.delete('/', auth, usersController.deleteUser); 

module.exports = router;