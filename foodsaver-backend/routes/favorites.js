const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');
const auth = require('../middleware/auth');

router.get('/', auth, favoritesController.getFavorites); 
router.post('/', auth, favoritesController.addFavorites); 
router.delete('/:id', auth, favoritesController.deleteFavorites); 

module.exports = router;