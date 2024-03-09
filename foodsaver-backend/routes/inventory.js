const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const auth = require('../middleware/auth');

router.get('/:id', auth, inventoryController.getInventory);
router.post('/:id', auth, inventoryController.addInventory);
router.put('/:id', auth, inventoryController.editInventory)
router.put('/:id/discard', auth, inventoryController.discardInventory)

module.exports = router;