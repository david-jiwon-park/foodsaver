const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');
const auth = require('../middleware/auth');

router.post('/:userId', notificationsController.createDefaultNotifications); 
router.get('/:userId', auth, notificationsController.getUserNotifications); 
router.put('/:userId', auth, notificationsController.editUserNotifications); 

module.exports = router;