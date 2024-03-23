const express = require('express');
const router = express.Router();
const edamamApiController = require('../controllers/edamamApiController');
const auth = require('../middleware/auth');

router.post('/recipes', auth, edamamApiController.getRecipes); 
router.post('/favorites', auth, edamamApiController.getFavorites); 

module.exports = router;

