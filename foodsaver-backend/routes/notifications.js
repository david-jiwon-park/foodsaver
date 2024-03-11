const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');
const auth = require('../middleware/auth');

router.post('/', notificationsController.createDefaultNotifications); 
router.get('/', auth, notificationsController.getUserNotifications); 
router.put('/', auth, notificationsController.editUserNotifications); 

module.exports = router;