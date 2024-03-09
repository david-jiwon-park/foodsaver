const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');
const auth = require('../middleware/auth');

router.get('/:id', auth, notificationsController.getUserNotifications);
router.put('/:id', auth, notificationsController.editUserNotifications);

module.exports = router;