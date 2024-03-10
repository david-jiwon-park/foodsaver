const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const auth = require('../middleware/auth');

router.get('/:userId', auth, inventoryController.getInventory); 
router.post('/:userId', auth, inventoryController.addInventory); 
router.put('/:id', auth, inventoryController.editInventory); 

module.exports = router;